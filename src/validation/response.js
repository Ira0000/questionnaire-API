import Joi from 'joi';

export const responseValidationSchema = Joi.object({
  questionnaire_id: Joi.string().required().messages({
    'string.base': 'Questionnaire ID must be a string.',
    'any.required': 'Questionnaire ID is required.',
  }),

  respondent_id: Joi.string().required().messages({
    'string.base': 'Respondent ID must be a string.',
    'any.required': 'Respondent ID is required.',
  }),

  answers: Joi.array()
    .items(
      Joi.object({
        question_id: Joi.string().required().messages({
          'string.base': 'Question ID must be a string.',
          'any.required': 'Question ID is required.',
        }),
        answer: Joi.alternatives()
          .try(
            Joi.string().required(),
            Joi.array().items(Joi.string().required()),
          ) // Allow single answer or multiple answers for multi-choice
          .required()
          .messages({
            'string.base': 'Answer must be a string.',
            'array.base': 'Answer must be an array of strings.',
            'any.required': 'Answer is required.',
          }),
      }),
    )
    .required()
    .messages({
      'array.base': 'Answers must be an array.',
      'any.required': 'Answers are required.',
    }),

  completion_time: Joi.number().positive().required().messages({
    'number.base': 'Completion time must be a number.',
    'number.positive': 'Completion time must be a positive number.',
    'any.required': 'Completion time is required.',
  }),

  submitted_at: Joi.date().required().messages({
    'date.base': 'Submitted date must be a valid date.',
    'any.required': 'Submitted date is required.',
  }),
});
