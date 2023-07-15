import express from 'express';

const router = express.Router();

import newsController from '../app/controllers/NewsController.mjs';

router.get('/', newsController.index);

export default router;
