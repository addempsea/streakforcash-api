/* eslint-disable require-jsdoc */
import db from '../db';
import queries from '../db/queries/question';
import { Helper, constants, DBError } from '../utils';

const { generateId } = Helper;

/**
 * Contains a schema that describes the question resource on the app.
 * @class CustomerModel
 *
 */

class QuestionModel {
  /**
      * This is a constructor for creating questions.
      * @constructor
      *
      * @param { Object } options - contains the required properties for creating a
      * question instance.
      * @returns { QuestionModel } - An instance of the Customer Model.
      * @constructor CustomerModel
    */
  constructor(options) {
    this.id = generateId();
    this.title = options.title;
    this.options = options.options;
    this.start_time = options.startTime;
    this.end_time = options.endTime;
    this.status = 'not started';
    this.category_id = options.categoryId;
  }

  /**
   * Persists a new question to the DB
   * @memberof QuestionModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a question object or a DB Error.
   */
  async save() {
    try {
      await db.one(queries.createQuestion, [
        this.id,
        this.title,
        this.options,
        this.start_time,
        this.end_time,
        this.status,
        this.category_id
      ]);
    } catch (error) {
      const dbError = new DBError({
        status: constants.CREATE_QUESTION_FAIL,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default QuestionModel;
