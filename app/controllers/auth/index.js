/* eslint-disable require-jsdoc */
import UserModel from '../../models/users';
import { Helper, constants, genericErrors, ApiError } from '../../utils';
import SendVerificationEmail from '../../services/emails';
import UserActivations from '../../services/activations/activations';
import User from '../../services/users/index';

const { sendSignUpVerificationEmail } = SendVerificationEmail;
const { CREATE_USER_SUCCESSFULLY, INVALID_TOKEN, USER_VERIFICATION_SUCCESS } = constants;
const { successResponse, errorResponse } = Helper;
const { findUserAcvtivationToken, deleteTokenFromActivations } = UserActivations;
const { serverError } = genericErrors;
const { updateUserVerification } = User;
/**
 * Contain several methods that authenticate user and the response they recieve
 */

class AuthController {
  /**
     * Register user
     * @param {Request} req - The request sent from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @returns {JSON} A JSON response return by the function which includes user details and JWT
     * @memberof AuthController
     */

  static async signUpUser(req, res, next) {
    try {
      const user = new UserModel(req.body);
      const userDetails = await user.save();
      await sendSignUpVerificationEmail(userDetails);
      return successResponse(res,
        { code: 201, message: CREATE_USER_SUCCESSFULLY, data: userDetails });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }

  /**
     * Update user
     * @param {Request} req - The request sent from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {next} next - The function that runs called the method as resolved
     * @returns {JSON} A JSON response return by the function which includes user details and JWT
     * @memberof AuthController
     */
  static async updateUserVerificationStatus(req, res, next) {
    try {
      const { token } = req.query;
      const userToken = await findUserAcvtivationToken(token);
      if (!userToken || userToken === null) {
        return errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: INVALID_TOKEN
          })
        );
      }
      await updateUserVerification(userToken.userid);
      await deleteTokenFromActivations(token);
      successResponse(res, { message: USER_VERIFICATION_SUCCESS });
    } catch (e) {
      next(errorResponse(req, res, serverError));
    }
  }
}

export default AuthController;
