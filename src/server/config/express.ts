import * as bodyParser from 'body-parser';
import compress from 'compression';
import flash from 'connect-flash';
import express from 'express';
import hbs from 'express-hbs';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import setAPIRoutes from './../app/routes/apiRoutes';

export default async function () {
    try {
        const app = express();
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
        } else if (process.env.NODE_ENV === 'production') {
            app.use(compress());
        }

        app.set('port', (process.env.PORT || 3000));

        // configure the view engine
        app.engine('hbs', hbs.express4({
            // defaultLayout: path.join(__dirname, 'views', 'layouts', 'default.hbs'),
            layoutsDir: path.join(__dirname, '..', 'public', 'views', 'layouts'),
            partialsDir: path.join(__dirname, '..', 'public', 'views', 'partials'),
        }));

        // set the view engine
        app.set('view engine', 'hbs');

        // configure views path
        app.set('views', path.join(__dirname, '..', 'public', 'views'));

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: 'config.sessionSecret',
        }));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        return app;
    } catch {
        throw new Error('error in the Express configuration');
    }
}
