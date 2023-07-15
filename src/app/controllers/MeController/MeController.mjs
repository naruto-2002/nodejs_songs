import Song from '../../models/Song.cjs';
import { multipleMongooseToObject } from '../../../util/mongoose.mjs';
import { mongooseToObject } from '../../../util/mongoose.mjs';

const MeController = {
    // [GET] /me/stored/songs
    storedSongs(req, res, next) {
        Promise.all([Song.find({}), Song.countWithDeleted({deleted: true})])
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
        Promise.all([Song.findWithDeleted({deleted: true}), Song.count({})])
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
