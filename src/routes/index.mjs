import siteRouter from './site.mjs';
import newsRouter from './news.mjs';
import songsRouter from './songs/songs.mjs';

const route = (app) => {
    app.use('/news', newsRouter);
    app.use('/songs', songsRouter);
    app.use('/me', songsRouter);
    app.use('/', siteRouter);
};

export default route;
