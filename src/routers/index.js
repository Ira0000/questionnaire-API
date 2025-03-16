import { Router } from 'express';

import questionnairesRouter from './questionnaires.js';
const router = Router();

router.use('/questionnaires', questionnairesRouter);
// router.use('/responses', responseRoutes);

export default router;
