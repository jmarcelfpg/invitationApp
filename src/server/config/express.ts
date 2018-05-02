import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';
import path from 'path';
import compress from 'compression';
import session from 'express-session';
import express from 'express';
import passport from 'passport';

export default async function () {
    const app = express()
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: "config.sessionSecret"
    }));

    app.use(passport.initialize())
    app.use(passport.session());

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('port', (process.env.PORT || 3000));

    const server = http.createServer(app);
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    
    console.log('Starting Express Server');
    server.listen(app.get('port'), () => {
        console.log('Express listening on port ' + app.get('port'))
    })
    return server;
};