import createHttpError from 'http-errors';
import { createResponse, getResponseById } from '../services/responses.js';
import { Questionnaire } from '../db/models/Questionnaire.js';

export const getResponseByIdController = async (req, res) => {
  const { responseId } = req.params;
  const response = await getResponseById(responseId);

  if (response === null) {
    throw createHttpError(404, 'Response not found');
  }

  // if (response.userId.toString() !== req.user.id.toString()) {
  //   throw new createHttpError.NotFound('Response not found');
  // }

  res.send({
    status: 200,
    message: `Successfully found response with id ${responseId}`,
    data: response,
  });
};

export const createResponseController = async (req, res) => {
  //   const photo = req.file;
  //   let photoUrl = null;

  //   if (photo) {
  //     photoUrl = await saveFileToUploadDir(photo);

  //     photoUrl = await saveFileToCloudinary(photo);
  //   }
  const { questionnaire_id, respondent_id, answers, completion_time } =
    req.body;

  const questionnaire = await Questionnaire.findById(questionnaire_id);
  if (!questionnaire) {
    throw createHttpError(404, 'Questionnaire not found');
  }
  const newResponse = {
    questionnaire_id,
    respondent_id,
    answers,
    completion_time,
    submitted_at: new Date(),
  };
  const result = await createResponse(newResponse);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a response!',
    data: result,
  });
};
