import { model, Schema } from 'mongoose';

const QuestionSchema = new Schema({
  type: {
    type: String,
    enum: ['text', 'single-choice', 'multiple-choice'],
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 300,
  },

  options: {
    type: [String],
    validate: {
      validator: function (options) {
        // If type is 'single-choice' or 'multiple-choice', options must have at least 2 items
        if (this.type === 'single-choice' || this.type === 'multiple-choice') {
          return Array.isArray(options) && options.length >= 2;
        }
        return options.length === 0 || options === undefined; // Should be empty for 'text' type
      },
      message:
        'Options are required for single-choice and multiple-choice questions (at least 2).',
    },
  },
});

const QuestionnaireSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    questions: {
      type: [QuestionSchema],
      validate: {
        validator: (q) => q.length > 0,
        message: 'At least one question is required.',
      },
    },
  },
  { timestamps: true },
);

export const Questionnaire = model('Questionnaire', QuestionnaireSchema);
