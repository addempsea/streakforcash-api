/* eslint-disable require-jsdoc */
import db from '../db';
import queries from '../db/queries/users';
import { Helper, DBError, constants } from '../utils';

const { INTERNAL_SERVER_ERROR } = constants;
const { createUser } = queries;
/**
 * Contains a schema that creates user and retrieve their information
 *  @class UserModel
 *
 */

class UserModel {
  /**
   * This is a constructor for creating a User.
   * @param { Object } userInfo - contains the required properties for creating
   * User instance.
   * @returns { UserModel } - An instance of the User Model.
   * @constructor UserModel
   *
   */
  constructor(userInfo) {
    this.id = Helper.generateId();
    this.username = userInfo.username;
    this.email = userInfo.email;
    this.password = userInfo.hash;
    this.salt = userInfo.salt;
    this.role = 'basic';
    this.is_verified = false;
  }

  async save() {
    try {
      return db.oneOrNone(createUser, [this.id,
        this.username,
        this.email,
        this.password,
        this.salt,
        this.role, this.is_verified]);
    } catch (e) {
      const error = new DBError({
        status: INTERNAL_SERVER_ERROR,
        message: e.message,
      });

      throw error;
    }
  }
}

export default UserModel;
