import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { questionnaireId } = req.params;
  if (!isValidObjectId(questionnaireId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};
