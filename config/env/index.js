import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const {
  SFC_SECRET: SECRET,
  SFC_NODE_ENV: NODE_ENV,
  SENGRID_API_KEY: SENDGRID_KEY
} = process.env;

const currentEnv = {
  development,
  test,
  production
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  SECRET,
  SENDGRID_KEY,
  NODE_ENV
};
