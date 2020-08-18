/* eslint-disable require-jsdoc */
import queries from '../../db/queries/users';
import Db from '../../db';

const { findUser, updateUser, findUserWithId } = queries;
/**
 *  Contains several methods to manage user resorces
 * @class UserServices
 */

class UserServices {
/**
   * Fetches a User by his/her email.
   * @memberof UserSerces
   * @param { String } email - The email address of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
*/

  static async fetchUser(items) {
    return Db.oneOrNone(findUser, [items]);
  }

  static async updateUserVerification(id) {
    return Db.oneOrNone(updateUser, [id]);
  }

  static findUserById(id) {
    return Db.oneOrNone(findUserWithId, [id]);
  }
}

export default UserServices;
