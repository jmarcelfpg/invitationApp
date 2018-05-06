import * as bodyParser from 'body-parser';
import compress from 'compression';
import express from 'express';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import flash from 'connect-flash';
import path from 'path';

export default async function () {
    try {
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
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(express.static(path.join(__dirname, '..', 'public')));
        app.set('port', (process.env.PORT || 3000));

        app.get('/board', (req, res, next) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'board.html'));
        });
        app.get('/resetPass', (req, res, next) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'resetPass.html'));
        });
        app.get('/register', (req, res, next) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
        });
        app.get('/admin', (req, res, next) => { 
            res.sendFile(path.join(__dirname, '..', 'public', 'admin.html')); 
        });
        app.get('/profile', (req, res, next) => { 
            res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
        });
        app.get('/resetPass', (req, res, next) => { 
            res.sendFile(path.join(__dirname, '..', 'public', 'resetPass.html')); 
        });
        app.get('/registered', (req, res, next) => { 
            res.sendFile(path.join(__dirname, '..', 'public', 'registered.html')); 
        });
        app.get('/register', (req, res, next) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'register.html')); 
        });
        app.post('/login', (req, res, next) => {
            const email = req.body.email;
            const password = req.body.password;
            console.log(email);
            console.log(password);
            res.send('Hi').status(200);
        });
        app.post('/confirmation', (req, res, next) => {
            const confirmation = req.body.confirmation;
            console.log(confirmation);
            res.send(confirmation).status(200);
        });

        app.use('/logout', (req, res, next) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
        });
        app.get('/users', (req, res, next) => {
            res.send([{ name: 'Ronaldo', lastname: 'Perez', confirmation: 1, fee: 500 }]);
        });
        app.get('/role', (req, res, next) => {
            res.send('admin');
        });
        app.get('/confirmation', (req, res, next) => {
            res.send('0').status(200);
        });
        app.use('*', (req, res, next) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
        });
        return app;
    } catch {
        throw new Error("error in the Express configuration")
    }
}
