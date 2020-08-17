import QuestionModel from '../../models/question';
import { Helper, constants, DBError, ApiError } from '../../utils';

const { successResponse } = Helper;

const { SUCCESS_CREATE_UNAVAILABLE_ITEM, FAIL_CREATE_UNAVAILABLE_ITEM } = constants;

// eslint-disable-next-line require-jsdoc
class QuestionController {
  /**
   * Controllers used for adding unavailable item patterns
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the unavailable item patterns
   * @memberof QuestionController
   */
  static async createQuestion(req, res, next) {
    try {
      const question = new QuestionModel({
        ...req.body
      });
      const { id } = question.save();
      return successResponse(res, {
        message: SUCCESS_CREATE_UNAVAILABLE_ITEM,
        data: { id, ...question }
      });
    } catch (error) {
      const dbError = new DBError({
        status: FAIL_CREATE_UNAVAILABLE_ITEM,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: FAIL_CREATE_UNAVAILABLE_ITEM }));
      throw dbError;
    }
  }
}

export default QuestionController;
