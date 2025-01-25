import * as Joi from "joi";

export const challengeSchema = Joi.object({
    thumbnail: Joi.string().required().messages({
        'string.base': "Thumbnail must be a string",
        'any.required': "Thumbnail is required",
    }),

    title: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Title must be a string',
        'string.min': 'Atleast 3 character is required',
        'string.max': 'Maximum character is 100',
        'any.required': 'Title is required'
    }),

    description: Joi.string().min(10).max(300).required().messages({
        'string.base': 'Title must be a string',
        'string.min': 'Atleast 10 character is required',
        'string.max': 'Maximum character is 300',
        'any.required': 'Title is required'
    }),

    tags: Joi.object().pattern(Joi.string(), Joi.string()).required().messages({
        'object.base': 'Tags must be an object with key strings and key values',
        'any.required': 'Tags is required'
    }),

    avatar_id: Joi.number().integer().required().messages({
        'number.base': 'avatar_id must be an integer',
        'any.required': 'avatar_id is required'
    }),

    links: Joi.object().pattern(Joi.string(), Joi.string()).required().messages({
        'object.base': 'links must be an object with string keys and string values',
        'any.required': 'links are required'
    }),

    image: Joi.object().pattern(Joi.string(), Joi.string()).required().messages({
        'object.base': 'image must be an object with string keys and string values',
        'any.required': 'image is required'
    }),

    reference: Joi.object().pattern(Joi.string(), Joi.string()).required().messages({
        'object.base': 'reference must be an object with string keys and string values',
        'any.required': 'reference is required'
    }),

    created_at: Joi.date().required().messages({
        'any.required': 'created_at is required'
    }),

    created_by: Joi.string().required().messages({
        'string.base': 'created_by must be a string',
        'any.required': 'created_by is required'
    })
})

