import { Router } from 'express';
import { responseValidationSchema } from '../validation/response.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createResponseController,
  getResponseByIdController,
} from '../controllers/responses.js';
import { isValidResponseId } from '../middlewares/isValidId.js';

const router = Router();

router.post(
  '/',
  validateBody(responseValidationSchema),
  ctrlWrapper(createResponseController),
);

router.get(
  '/:responseId',
  isValidResponseId,
  ctrlWrapper(getResponseByIdController),
);

export default router;
