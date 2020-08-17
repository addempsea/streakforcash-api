/* eslint-disable require-jsdoc */
import MailGen from 'mailgen';
import { constants } from '../../utils';

const { v1 } = constants;
/**
 * Contains function that generate verification in email
 *@class EmailGenerator
 @constructor EmailGenerator
 */

class EmailGenerator {
  // /**
  //  * This is a constructor for creating a User.
  //  * @param { Object } emailInfo - contains the required properties for generating
  //  * email.
  //  * @returns { EmailGenerator } - An instance of the EmailGenerator.
  //  * @constructor EmailGenerator
  //  *
  //  */
  // constructor(emailInfo) {
  //   this.username = emailInfo.username;
  //   this.link = emailInfo.links;
  // }

  /**
 * Generate a email for user to confirm the email provided during signup;
 * @static
 *@memberof EmailGenerator
 @returns {Object} - It return the default email generator provided
 */
  static configMailGen() {
    const mail = new MailGen({
      theme: 'default',
      product: {
        name: 'streakforcash',
        link: `http://localhost:3000/${v1}`,
      }

    });
    return mail;
  }
  /**
  * Generate a email for user to confirm the email provided during signup;
  * @static
  *@memberof EmailGenerator
  @returns {Object} - It returns the object of email format provided
  */

  static mailGenEmailFormat(username, mailLink) {
    const body = {
      body: {
        name: username,
        intro: 'Welcome to StreakForCash! We\'re very excited to have you on board.',
        action: {
          instructions: 'To get started with streakforcash, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: mailLink
          }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    };

    return body;
  }
}

export default EmailGenerator;
