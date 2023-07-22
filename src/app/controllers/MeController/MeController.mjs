import Song from '../../models/Song.cjs';
import { multipleMongooseToObject } from '../../../util/mongoose.mjs';
import { mongooseToObject } from '../../../util/mongoose.mjs';

const MeController = {
    // [GET] /me/stored/songs
    storedSongs(req, res, next) {

        let songQuery = Song.find({})

        if(req.query.hasOwnProperty('_sort')) {
            songQuery = songQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([songQuery, Song.countWithDeleted({deleted: true})])
            .then(([songs, deletedCount]) => {
                res.render('me/stored-songs', { 
                    deletedCount,
                    songs: multipleMongooseToObject(songs) 
                });
            })
            .catch(next)

    },
    // [GET] /me/stored/songs
    trashSongs(req, res, next) {

        let songQuery = Song.findWithDeleted({deleted: true})

        if(req.query.hasOwnProperty('_sort')) {
            songQuery = songQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([songQuery, Song.count({})])
            .then(([songs, undeliveredCount]) => {
                res.render('me/trash-songs', { 
                    undeliveredCount,
                    songs: multipleMongooseToObject(songs) 
                });
            })
            .catch(next)
    },
};

export default MeController;
