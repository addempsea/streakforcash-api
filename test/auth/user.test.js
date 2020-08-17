import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../index';
import * as url from './index';
import { constants } from '../../app/utils';

const { CREATE_USER_SUCCESSFULLY, EMAIL_CONFLICT } = constants;

chai.use(chaiHttp);
const request = chai.request(app);

describe('AUATHENTICATION API TEST', async () => {
  it('Should signup user and send verification email', async () => {
    const response = await request
      .post(url.signUpUrl)
      .send(url.user);
    if (response.statusCode === 409) {
      expect(response.statusCode).to.equal(409);
      expect(response.body.message).to.equals(EMAIL_CONFLICT);
    }
    expect(response.statusCode).to.equal(201);
    expect(response.body.message).to.equals(CREATE_USER_SUCCESSFULLY);
  });
});
