import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { questionnaireId } = req.params;
  if (!isValidObjectId(questionnaireId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};

export const isValidResponseId = (req, res, next) => {
  const { responseId } = req.params;
  if (!isValidObjectId(responseId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};
