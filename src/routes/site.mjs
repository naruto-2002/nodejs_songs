import express from 'express';

const router = express.Router();

import siteController from '../app/controllers/SiteController.mjs';

router.get('/', siteController.index);

export default router;
