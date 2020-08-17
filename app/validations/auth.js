import Joi from '@hapi/joi';

const username = Joi.string().max(20).messages({
  'string.pattern.base': 'username cannot contain numbers and should not be empty',
  'string.empty': 'username cannot be an empty field',
  'string.max': 'username field cannt be more than 20 vhaeacter',
  'any.required': 'username field cannot be empty'
});

const password = Joi.string()
  .trim().required()
  .pattern(new RegExp('^[a-zA-Z0-9@#%$!+:_|-]{5,30}$'))
  .messages({
    'string.base': 'Password must be a valid string',
    'string.empty': 'Password field cannot be empty',
    'any.required': 'Password field is required else password cannot be updated',
  });

export const signUpSchema = Joi.object({
  username,
  email: Joi.string().email(),
  password,

});

export const updateUserSchema = Joi.object({});
