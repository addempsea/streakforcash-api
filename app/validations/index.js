import Joi from '@hapi/joi';

const password = Joi.string()
  .trim().required()
  .pattern(new RegExp('^[a-zA-Z0-9@#%$!+:_|-]{5,30}$'))
  .messages({
    'string.base': 'Password must be a valid string',
    'string.empty': 'Password field cannot be empty',
    'any.required': 'Password field is required else password cannot be updated',
    'object.pattern.match': 'The only validate combinations are numbers, alphabets, and these characters: a-zA-Z0-9@#%$!+:_|-',

  });

export default password;
