const { Schema, model } = require('mongoose');

const ResponseSchema = new Schema(
  {
    questionnaireId: {
      type: Schema.Types.ObjectId,
      ref: 'Questionnaire',
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, required: true },
    answers: [
      {
        questionIndex: Number,
        answer: Schema.Types.Mixed,
      },
    ],
    startTime: Date,
    endTime: Date,
    duration: Number,
  },
  { timestamps: true },
);

export const Response = model('Response', ResponseSchema);
