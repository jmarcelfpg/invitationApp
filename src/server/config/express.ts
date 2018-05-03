import * as bodyParser from 'body-parser';
import compress from 'compression';
import express from 'express';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

export default async function() {
    const app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'config.sessionSecret',
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('port', (process.env.PORT || 3000));

    app.get('/board', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'board.html')); });
    app.get('/resetPass', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'resetPass.html')); });
    app.get('/register', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'register.html')); });
    app.post('/register', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const lastName = req.body.lastName;
        const contact = req.body.contact;
        const confirmation = req.body.confirmation;
        console.log(email);
        console.log(password);
        console.log(name);
        console.log(lastName);
        console.log(contact);
        console.log(confirmation);
        res.send('Hi').status(200);
    });
    app.post('/login', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);
        res.send('Hi').status(200);
    });
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    const server = http.createServer(app);
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    console.log('Starting Express Server');
    server.listen(app.get('port'), () => {
        console.log('Express listening on port ' + app.get('port'));
    });
    return server;
}
