import express from 'express';

const router = express.Router();

import songsController from '../../app/controllers/SongsController/SongsController.mjs';
import meController from '../../app/controllers/MeController/MeController.mjs';

router.get('/stored/songs', meController.storedSongs);
router.get('/trash/songs', meController.trashSongs);
router.get('/create', songsController.create);
router.post('/store', songsController.store);
router.post('/handle-form-actions', songsController.handleFormActions);
router.patch('/:id/restore', songsController.restore);
router.get('/:id/edit', songsController.edit);
router.put('/:id', songsController.update);
router.delete('/:id', songsController.destroy);
router.delete('/:id/focus', songsController.deleteFocus);
router.get('/:slug', songsController.show);
router.get('/', songsController.index);

export default router;
