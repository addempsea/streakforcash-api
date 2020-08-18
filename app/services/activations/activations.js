/* eslint-disable require-jsdoc */
import Db from '../../db';
import queries from '../../db/queries/activations';
import { DBError, constants } from '../../utils';

const { INTERNAL_SERVER_ERROR } = constants;
const { saveToken, findToken, removeToken } = queries;
/**
 * Contains methods that activates after signing up
 * @class
 */

class UserActivations {
  /**
     * Saves token token to the database immediatey user signup
     * @param {string} Token - The token generate a token for each user
     * @param {string} userId - The id of the user who is verifying

*/

  static storeActivationToken(userId, token) {
    try {
      return Db.none(saveToken, [userId, token]);
    } catch (e) {
      const error = new DBError({
        status: INTERNAL_SERVER_ERROR,
        message: e.message,
      });
      throw error;
    }
  }
  /**
     * Retirives user token from the database if it exist
     * @param {token} Token - The token generated for user during signup
    * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a token resource  or a DB Error.
*/

  static async findUserAcvtivationToken(token) {
    return Db.oneOrNone(findToken, [token]);
  }

  static deleteTokenFromActivations(token) {
    return Db.none(removeToken, [token]);
  }
}

export default UserActivations;
