import Joi from 'joi';

export const questionnaireValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters.',
    'string.max': 'Name must be at most 100 characters.',
  }),

  description: Joi.string().trim().min(3).max(200).required().messages({
    'string.base': 'Description must be a string.',
    'string.empty': 'Description is required.',
    'string.min': 'Description must be at least 3 characters.',
    'string.max': 'Description must be at most 200 characters.',
  }),

  questions: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid('text', 'single-choice', 'multiple-choice')
          .required()
          .messages({
            'any.only':
              'Type must be one of text, single-choice, or multiple-choice.',
            'any.required': 'Type is required.',
          }),

        text: Joi.string().trim().min(3).max(300).required().messages({
          'string.base': 'Question text must be a string.',
          'string.empty': 'Question text is required.',
          'string.min': 'Question text must be at least 3 characters.',
          'string.max': 'Question text must be at most 300 characters.',
        }),

        options: Joi.array()
          .items(Joi.string().trim().min(1).max(100))
          .when('type', {
            is: Joi.string().valid('single-choice', 'multiple-choice'),
            then: Joi.array().min(2).required().messages({
              'array.min':
                'Single-choice and multiple-choice questions require at least two options.',
              'any.required':
                'Options are required for single-choice and multiple-choice questions.',
            }),
            otherwise: Joi.forbidden(),
          }),
      }),
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Questions must be an array.',
      'array.min': 'At least one question is required.',
      'any.required': 'Questions field is required.',
    }),
});

export const questionnairePatchValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 3 characters.',
    'string.max': 'Name must be at most 100 characters.',
  }),

  description: Joi.string().trim().min(3).max(200).optional().messages({
    'string.base': 'Description must be a string.',
    'string.empty': 'Description cannot be empty.',
    'string.min': 'Description must be at least 3 characters.',
    'string.max': 'Description must be at most 200 characters.',
  }),

  questions: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid('text', 'single-choice', 'multiple-choice')
          .optional()
          .messages({
            'any.only':
              'Type must be one of text, single-choice, or multiple-choice.',
          }),

        text: Joi.string().trim().min(3).max(300).optional().messages({
          'string.base': 'Question text must be a string.',
          'string.empty': 'Question text cannot be empty.',
          'string.min': 'Question text must be at least 3 characters.',
          'string.max': 'Question text must be at most 300 characters.',
        }),

        options: Joi.array()
          .items(Joi.string().trim().min(1).max(100))
          .optional()
          .when('type', {
            is: Joi.string().valid('single-choice', 'multiple-choice'),
            then: Joi.array().min(2).optional().messages({
              'array.min':
                'Single-choice and multiple-choice questions require at least two options.',
            }),
            otherwise: Joi.forbidden(),
          }),
      }),
    )
    .optional()
    .messages({
      'array.base': 'Questions must be an array.',
    }),
});
