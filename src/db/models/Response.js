import { model, Schema } from 'mongoose';

const ResponseSchema = new Schema(
  {
    questionnaire_id: {
      type: Schema.Types.ObjectId,
      ref: 'Questionnaire',
      required: true,
    },
    respondent_id: {
      type: Schema.Types.ObjectId, // Assuming this is a user or respondent ID
      ref: 'User',
      required: true,
    },
    answers: [
      {
        question_id: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: {
          type: Schema.Types.Mixed, // Can handle string, number, array for multiple-choice
          required: true,
        },
      },
    ],
    completion_time: {
      type: Number, // Time taken to complete the questionnaire
      required: true,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Response = model('Response', ResponseSchema);
