import Joi from '@hapi/joi';
import { dateCheck, numberCheck, stringCheck } from './generic';

/**
* Generates a re-useable Joi validation schema for fields that only checks for required.
* @param { Object } joiObject - Joi object.
* @param { String } field - Field to be validated.
* @returns { Object } A Joi validation schema.
*/
export const createQuestionSchema = Joi.object({
  startTime: dateCheck('start time', Joi),
  endTime: dateCheck('end time', Joi),
  title: stringCheck('title', Joi),
  options: Joi.array().items(Joi.string()).min(2),
  categoryId: numberCheck('category id', Joi)
});

export const yy = {};
