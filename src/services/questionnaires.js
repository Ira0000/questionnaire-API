import { Questionnaire } from '../db/models/Questionnaire.js';
import { Response } from '../db/models/Response.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllQuestionnaires = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const questionnairesQuery = Questionnaire.find();

  const questionnairesCount = await Questionnaire.find()
    .merge(questionnairesQuery)
    .countDocuments();

  const questionnaires = await questionnairesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  // Get response counts for each questionnaire
  const responseCounts = await Response.aggregate([
    { $group: { _id: '$questionnaire_id', responseCount: { $sum: 1 } } },
  ]);

  // Convert the response count array into a lookup object
  const responseCountMap = responseCounts.reduce((acc, curr) => {
    acc[curr._id.toString()] = curr.responseCount;
    return acc;
  }, {});

  // Add `questionsQuantity` and `responseCount` to each questionnaire
  const formattedQuestionnaires = questionnaires.map((q) => ({
    ...q.toObject(),
    questionsQuantity: q.questions.length,
    responseCount: responseCountMap[q._id.toString()] || 0, // Default to 0 if no responses
  }));

  const paginationData = calculatePaginationData(
    questionnairesCount,
    perPage,
    page,
  );

  return {
    data: formattedQuestionnaires,
    ...paginationData,
  };
};

export const getQuestionnaireById = async (questionnaireId) => {
  const questionnaire = await Questionnaire.findOne({ _id: questionnaireId });

  if (!questionnaire) {
    return null;
  }

  return {
    ...questionnaire.toObject(),
    questionsQuantity: questionnaire.questions.length,
  };
};

export const createQuestionnaire = async (payload) => {
  const questionnaire = await Questionnaire.create(payload);
  return questionnaire;
};

export const updateQuestionnaire = async (questionnaireId, payload) => {
  return Questionnaire.findByIdAndUpdate(questionnaireId, payload, {
    new: true,
  });
};

export const deleteQuestionnaire = async (questionnaireId) => {
  return Questionnaire.findByIdAndDelete(questionnaireId);
};
