import { Questionnaire } from '../db/models/Questionnaire.js';
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

  // Add `questionsQuantity` to each questionnaire
  const formattedQuestionnaires = questionnaires.map((q) => ({
    ...q.toObject(),
    questionsQuantity: q.questions.length,
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
