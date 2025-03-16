import { Router } from 'express';

import {
  questionnairePatchValidationSchema,
  questionnaireValidationSchema,
} from '../validation/questionnaire.js';
import {
  createQquestionnaireController,
  deleteQuestionnaireController,
  getQuestionnaireByIdController,
  getQuestionnairesController,
  updateQuestionnaireController,
} from '../controllers/questionnaires.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();
router.get('/', ctrlWrapper(getQuestionnairesController));

router.get(
  '/:questionnaireId',
  isValidId,
  ctrlWrapper(getQuestionnaireByIdController),
);

router.post(
  '/',
  validateBody(questionnaireValidationSchema),
  ctrlWrapper(createQquestionnaireController),
);

router.patch(
  '/:questionnaireId',
  // jsonParser,
  isValidId,
  // upload.single('photo'),
  validateBody(questionnairePatchValidationSchema),
  ctrlWrapper(updateQuestionnaireController),
);

router.delete(
  '/:questionnaireId',
  isValidId,
  ctrlWrapper(deleteQuestionnaireController),
);

export default router;
