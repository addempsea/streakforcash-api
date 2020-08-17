import { ApiError, DBError, constants, Helper } from '../utils';
import { createQuestionSchema } from '../validations';

const { errorResponse } = Helper;

/**
 * A collection of methods used to verify the authenticity
 * of a request made while interacting with the question resource.
 *
 * @class QuestionMiddleware
 */
class QuestionMiddleware {
  /**
   * Checks that the request body sent by user is correct
   * @param {object} req - The request from the endpoint.
   * @param {object} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @returns {object} - Returns an object (error or response).
   * @memberof GoodsRecievedMiddleware
   *
   */
  static async createQuestionValidator(req, res, next) {
    try {
      await createQuestionSchema.validateAsync(req.body);
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: error.details[0].message,
      });
      errorResponse(req, res, apiError);
    }
  }
}

export default QuestionMiddleware;
