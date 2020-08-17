/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import UserServices from '../../services/users';
import { Helper, constants, ApiError, genericErrors } from '../../utils';
import UserActivations from '../../services/activations/activations';

const { findUserAcvtivationToken } = UserActivations;

const { fetchUser } = UserServices;
const { errorResponse, hashPassword } = Helper;
const { EMAIL_CONFLICT, INTERNAL_SERVER_ERROR, INALID_TOKEN } = constants;
const { serverError } = genericErrors;

/**
 * Contains several methods that validates the user
 *
 */

class AuthMiddleWare {
  /**
     * Checks if their is conflict in the database.
     * @static
     * @param {Object} req - The request from the endpoint.
     * @param {Object} res - The response returned by the method.
     * @param {function} next - Calls the next handle.
     * @returns {JSON / Null} - Returns error response or null if otherwise.
     * @memberof AuthMiddleWare.
     *
     */
  static async checkIfUserAlreadyExist(req, res, next) {
    try {
      const emailExist = await fetchUser(req.body.email);
      const usernameExist = await fetchUser(req.body.username);

      if ((emailExist) || (usernameExist)) {
        return errorResponse(
          req,
          res,
          new ApiError({
            status: 409,
            message: EMAIL_CONFLICT
          })
        );
      }
      next();
    } catch (e) {
      e.status = Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: INTERNAL_SERVER_ERROR })
      );
    }
  }

  static async createHashedPassword(req, res, next) {
    try {
      const { password } = req.body;
      const { hash, salt } = await hashPassword(password);
      req.body.salt = salt;
      req.body.hash = hash;
      next();
    } catch (e) {
      errorResponse(req, res, serverError);
    }
  }

  static async checkIfUserVerificationTokenExists(req, res, next) {
    try {
      const { token } = req.query;
      const userToken = await findUserAcvtivationToken(token);
      if (!userToken || userToken === null) {
        return errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: INALID_TOKEN
          })
        );
      }

      next();
    } catch (e) {
      const apiError = new ApiError({
        status: 500,
        message: e.details[0].message,
      });
      errorResponse(req, res, apiError);
    }
  }
}

export const validateUserInput = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (e) {
    const apiError = new ApiError({
      status: 400,
      message: e.details[0].message,
    });
    errorResponse(req, res, apiError);
  }
};
export default AuthMiddleWare;
