import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import {
  createQuestionnaire,
  deleteQuestionnaire,
  getAllQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
} from '../services/questionnaires.js';

export const getQuestionnairesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const questionnaires = await getAllQuestionnaires({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.send({
    status: 200,
    message: `Successfully found questionnaires!`,
    data: questionnaires,
  });
};

export const getQuestionnaireByIdController = async (req, res) => {
  const { questionnaireId } = req.params;
  const questionnaire = await getQuestionnaireById(questionnaireId);

  if (questionnaire === null) {
    throw createHttpError(404, 'Questionnaire not found');
  }

  //   if (questionnaire.userId.toString() !== req.user.id.toString()) {
  //     throw new createHttpError.NotFound('Contact not found');
  //   }

  res.send({
    status: 200,
    message: `Successfully found questionnaire with id ${questionnaireId}`,
    data: questionnaire,
  });
};

export const createQquestionnaireController = async (req, res) => {
  //   const photo = req.file;
  //   let photoUrl = null;

  //   if (photo) {
  //     photoUrl = await saveFileToUploadDir(photo);

  //     photoUrl = await saveFileToCloudinary(photo);
  //   }

  const questionnaire = {
    name: req.body.name,
    description: req.body.description,
    questions: req.body.questions,
    // photo: photoUrl,
  };
  const result = await createQuestionnaire(questionnaire);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a questionnaire!',
    data: result,
  });
};

export const updateQuestionnaireController = async (req, res) => {
  const { questionnaireId } = req.params;

  //   const photo = req.file;
  //   let photoUrl;

  //   if (photo) {
  //     photoUrl = await saveFileToCloudinary(photo);
  //   }
  const questionnaire = {
    name: req.body.name,
    description: req.body.description,
    questions: req.body.questions,
    // photo: photoUrl,
  };

  const result = await updateQuestionnaire(questionnaireId, questionnaire);

  if (result === null) {
    throw createHttpError(404, 'Questionnaire not found');
  }

  //   if (contact.userId.toString() !== req.user.id.toString()) {
  //     throw new createHttpError.NotFound('Contact not found');
  //   }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a questionnaire!',
    data: result,
  });
};

export const deleteQuestionnaireController = async (req, res) => {
  const { questionnaireId } = req.params;
  const questionnaire = await deleteQuestionnaire(questionnaireId);

  if (!questionnaire) {
    throw createHttpError(404, 'Questionnaire not found');
  }

  //   if (questionnaire.userId.toString() !== req.user.id.toString()) {
  //     throw new createHttpError.NotFound('Contact not found');
  //   }

  res.status(204).send();
};
