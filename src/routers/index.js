import { Router } from 'express';

import questionnairesRouter from './questionnaires.js';
import responsesRouter from './responses.js';
const router = Router();

router.use('/questionnaires', questionnairesRouter);
router.use('/responses', responsesRouter);

export default router;
