/* eslint-disable require-jsdoc */
import sgMail from '@sendgrid/mail';
import config from '../../../config/env';
import EmailGenerator from '../email-templates';
import { constants, Helper } from '../../utils';
import UserActivations from '../activations/activations';

const { storeActivationToken } = UserActivations;
sgMail.setApiKey(config.SENGRID_API_KEY);

const { BASE_URL, v1 } = constants;

const { generateUniqueId } = Helper;

const { configMailGen, mailGenEmailFormat } = EmailGenerator;

// console.log(config.SENGRID_API_KEY);

/**
 * Contains function that generate verification in email
 *@class SendverificationEmail
 */

class SendverificationEmail {
  /**
   * This is a constructor for creating a User.
   * @param { Object } data - contains the required properties for sending
   * User verification email
   * @returns { UserModel } - An instance of the User Model.
   * @constructor UserModel
   *
   */
  static async sendSignUpVerificationEmail(data) {
    const token = generateUniqueId();
    const link = `${BASE_URL}${v1}/auth/verify/email?token=${token}`;
    const mailGen = await configMailGen();
    const email = await mailGenEmailFormat(data.username, link);
    const emailTemplate = mailGen.generate(email);

    await storeActivationToken(data.id, token);

    const msg = {
      to: `${data.email}`,
      from: 'admin@uptima.ng',
      subject: 'SIGNUP VERIFICATION EMAIL',
      html: emailTemplate,
    };

    await sgMail.send(msg);
  }
}

export default SendverificationEmail;
