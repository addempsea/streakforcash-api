export const idCheck = (param, joiObject) => joiObject.number()
  .required()
  .messages({
    'any.required': `${param} id is a required field`,
    'number.base': `${param} id must be a number`
  });

export const uuidCheck = (param, joiObject) => joiObject.string().guid()
  .messages({
    'string.empty': `${param} cannot be an empty string`,
    'string.base': `${param} must be a uuid string`,
    'string.guid': `${param} must be a valid UUID`
  });

export const dateCheck = (param, joiObject) => joiObject.date().required()
  .messages({
    // 'date.format': `${param} does not match timestamp`,
    'any.required': `${param} is a required filed`
  });

export const numberCheck = (param, joiObject) => joiObject.number().required()
  .messages({
    'any.required': `${param}  is a required field`,
    'number.base': `${param}  must be a number`
  });

export const stringCheck = (param, joiObject) => joiObject.string().required()
  .messages({
    'string.empty': `${param}  cannot be empty`,
    'string.base': `${param}  must be a string`,
    'string.min': `${param} must be atleast 3 characters long`
  });
