import db from '../db';
import queries from '../db/queries/category';
import { Helper, constants, DBError } from '../utils';

/**
 * Contains a schema that describes the category resource on the app.
 * @class Category
 *
 */
class CategoryModel {
  /**
       * This is a constructor for creating category.
      * @constructor
      *
      * @param { Object } options - contains the required properties for creating a
      * category instance.
      * @returns { QuestionModel } - An instance of the Category Model.
      * @constructor Category
    */
  constructor(options) {
    this.title = options.title;
  }

  /**
   * Persists a new category to the DB
   * @memberof  CategoryModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with acategory object or a DB Error.
   */
  async save() {
    try {
      await db.one(queries.createCategory, [
        this.title
      ]);
    } catch (error) {
      const dbError = new DBError({
        status: constants.CREATE_CATEGORY_FAIL,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default CategoryModel;
