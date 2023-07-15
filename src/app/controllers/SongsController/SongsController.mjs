import Song from '../../models/Song.cjs';
import { multipleMongooseToObject } from '../../../util/mongoose.mjs';
import { mongooseToObject } from '../../../util/mongoose.mjs';

const SongsController = {
    // [GET] /songs
    index(req, res, next) {
        Song.find({})
            .then((songs) => res.render('songs/songs', { songs: multipleMongooseToObject(songs) }))
            .catch(next);
    },
    // [GET] /songs/slug
    show(req, res, next) {
        Song.findOne({ slug: req.params.slug })
            .then((song) => {
                res.render('songs/songItem', { song: mongooseToObject(song) });
            })
            .catch(next);
    },
    // [GET] /songs/create
    create(req, res) {
        res.render('songs/create');
    },
    //  [POST] /songs/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hq720.jpg`;
        Song.create(formData)
            .then(() => {
                res.redirect('/me/stored/songs');
            })
            .catch(next);
    },
    // [GET] /songs/id:/edit
    edit(req, res, next) {
        Song.findById(req.params.id).then((song) => {
            res.render('songs/edit', { song: mongooseToObject(song) });
        });
    },
    // [PUT] /songs/id
    update(req, res, next) {
        Song.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/songs'))
            .catch(next);
    },
    // [Delete] /song/id
    destroy(req, res, next) {
        Song.delete({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    },
    // [Delete] /song/id/focus
    deleteFocus(req, res, next) {
        Song.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    },
    // [PATCH] /songs/id:/restore
    restore(req, res, next) {
        Song.restore({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    },
};

export default SongsController;
