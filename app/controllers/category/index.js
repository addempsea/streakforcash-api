import CategoryModel from '../../models/category';
import { Helper, constants, DBError, ApiError } from '../../utils';

const { successResponse } = Helper;

const { SUCCESS_CREATE_UNAVAILABLE_ITEM, FAIL_CREATE_UNAVAILABLE_ITEM } = constants;

// eslint-disable-next-line require-jsdoc
class CategoryController {
  /**
   * Controllers used for adding unavailable item patterns
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the unavailable item patterns
   * @memberof CategoryController
   */
  static async createCategory(req, res, next) {
    try {
      const category = new CategoryModel({
        ...req.body
      });
      const { id } = category.save();
      return successResponse(res, {
        message: SUCCESS_CREATE_UNAVAILABLE_ITEM,
        data: { id, ...category }
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

export default CategoryController;
