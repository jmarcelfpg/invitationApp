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
import * as routes from '../app/routes';
import setAPIRoutes from './../app/routes/apiRoutes';

export default async function() {
    try {
        const app = express();
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
        } else if (process.env.NODE_ENV === 'production') {
            app.use(compress());
        }

        app.set('port', (process.env.PORT || 3000));

        // set the view engine
        app.set('view engine', 'hbs');

        // configure the view engine
        app.engine('hbs', hbs.express4({
            // defaultLayout: path.join(__dirname, 'views', 'layouts', 'default.hbs'),
            // layoutsDir: path.join(__dirname, 'views', 'layouts'),
            // partialsDir: path.join(__dirname, 'views', 'partials'),
        }));

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

        // app.use('/', express.static('public'));

        // app.get('/board', routes.board);
        // app.get('/logout', routes.User.logout);
        // app.get('/admin', routes.admin);
        // app.get('/profile', routes.profile);
        // app.get('/resetPass', routes.resetPass);
        // app.get('/registered', routes.registered);
        // app.get('/signin', routes.signin);
        // app.get('/signup', routes.signup);
        // app.get('/registeradmin', routes.registerAdmin);

        // Rest routes
        // app.post('/register', routes.User.signup);
        // app.post('/signin', routes.User.signin);
        // app.post('/resetPass', (req, res, next) => {
        //     const email = req.body.email;
        //     console.log(email);
        //     /* transporter.sendMail({
        //         subject: 'Message',
        //         text: `reset password Email`,
        //         to: email,
        //     }); */
        //     res.send(true).status(200);
        // });
        // app.get('/users', (req, res, next) => {
        //     res.send([{ name: 'Ronaldo', lastname: 'Perez', confirmation: 1, fee: 500 }]);
        // });
        // app.get('/role', (req, res, next) => {
        //     res.send('user');
        // });
        // app.get('/confirmation', (req, res, next) => {
        //     res.send('0').status(200);
        // });
        // app.post('/confirmation', (req, res, next) => {
        //     const confirmation = req.body.confirmation;
        //     console.log(confirmation);
        //     res.send(confirmation).status(200);
        // });
        return app;
    } catch {
        throw new Error('error in the Express configuration');
    }
}
