import * as Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      'string.pattern.base': 'Name can only contain alphabets and spaces, no special characters or numbers.',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Username is required',
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/)
    .messages({
      'string.base': 'Password must be a string',
      'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),

  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .email({ tlds: { allow: true } }) // Combines regex with TLD validation
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.pattern.base': 'Email does not match the required format',
      'any.required': 'Email is required',
    }),

  role: Joi.string()
    .valid('user', 'admin') // Restricts role to "user" or "admin"
    .messages({
      'string.base': 'Role must be a string',
      'any.only': 'Role must be either "user" or "admin"',
      'any.required': 'Role is required',
    }),
}).or('username', 'password', 'email', 'role'); // Ensure at least one field is provided

// Use this for create operation (all fields required)
export const createUserSchema = userSchema.fork(
  ['username', 'password', 'email', 'role'], (field) => field.required()
);

// Use this for update operation (fields are optional)
export const updateUserSchema = userSchema;