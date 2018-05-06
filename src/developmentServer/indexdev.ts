// Server Modules
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import transporter from './plugins/mail';
import { User } from './plugins/models';
import * as routes from './routes';

// Middleware modules
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import session from 'express-session';
import methodOverride from 'method-override';
import logger from 'morgan';

// Database environment
(mongoose as any).Promise = global.Promise;
const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/invitationapp';
const db = mongoose.connect(dbUrl);

const app = express();
app.locals.appTitle = 'uaglia8830';

// Using middlewares for database
app.use((req, res, next) => {
    if (!User) { return next(new Error('No models.')); }
    return next();
});

// Configuration of the server
app.set('appName', 'uaglila8830');
app.set('port', process.env.PORT || 3000);

// Using Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '2C44774A-D649-4D44-9535-46E296EF984F',
}));

// Authentication middleware
app.use((req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        res.locals.role = 'admin';
    }
    next();
});

// Authorization
const authorize: express.RequestHandler = (req, res, next) => {
    if (req.session && req.session.role) {
        return next();
    } else {
        return res.send(401);
    }
};
const authorizeAdmin: express.RequestHandler = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        return next();
    } else {
        return res.send(401);
    }
};

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/logout', routes.User.logout);
app.get('/board', routes.board);
app.get('/admin', authorizeAdmin, routes.admin);
app.get('/profile', authorize, routes.profile);
app.get('/resetPass', routes.resetPass);
app.get('/registered', routes.registered);
app.get('/register', routes.register);
app.get('/registeradmin', routes.registerAdmin);

// Rest routes
app.post('/register', routes.User.register);
app.post('/login', routes.User.authenticate);
app.post('/resetPass', (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    /* transporter.sendMail({
        subject: 'Message',
        text: `reset password Email`,
        to: email,
    }); */
    res.send(true).status(200);
});
app.get('/users', (req, res, next) => {
    res.send([{ name: 'Ronaldo', lastname: 'Perez', confirmation: 1, fee: 500 }]);
});
app.get('/role', (req, res, next) => {
    res.send('user');
});
app.get('/confirmation', (req, res, next) => {
    res.send('0').status(200);
});
app.post('/confirmation', (req, res, next) => {
    const confirmation = req.body.confirmation;
    console.log(confirmation);
    res.send(confirmation).status(200);
});
app.use('*', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

// Catching all the routes
app.all('*', (req, res) => {
    res.status(404).send();
});

const serverHTTP = http.createServer(app);
serverHTTP.listen(app.get('port'), () => { console.log('server running on port ', app.get('port')); });
