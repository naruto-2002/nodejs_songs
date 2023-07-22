import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import methodOverride from 'method-override';

import db from './config/db/index.mjs';
import { sortMiddleware } from './app/middlewares/SortMiddlewares.mjs';

// Connect DB
db.connect();

import route from './routes/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('dev'));

// custom middlewwware
app.use(sortMiddleware)


// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {

                const sortType = (field === sort.column ? sort.type : 'default')

                const icons = {
                    default: 'bi bi-funnel',
                    desc: 'bi bi-sort-down',
                    asc: 'bi bi-sort-down-alt'
                }

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc'
                }

                const icon = icons[sortType]
                const type  = types[sortType]


                return (
                    `<a class="_btn" href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>`
                )
            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
