import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { Transporter } from 'nodemailer';
import { PassportStatic } from 'passport';
import UserController from '../controllers/userController';
import User from '../models/user';

export default function setAPIRoutes(app: Express, passport: PassportStatic, transporter: Transporter) {
    const api = express.Router();
    const userController = new UserController();

    // // Set up the 'initial' routes
    // api.all('/', );
    // Set up the 'board' routes
    api.route('/board')
        .get(userController.renderBoard);
    // Set up the 'profile' routes
    api.route('/profile')
        .get(userController.renderProfile);
    // Set up the 'admin' routes
    api.route('/admin')
        .get(userController.renderAdmin);
    // Set up the 'signupAdmin' routes
    api.route('/signupAdmin')
        .get(userController.renderSignupAdmin);
    // Set up the 'signup' routes
    api.route('/signup')
        .get(userController.renderSignup)
        .post(userController.signup(transporter));
    // Set up the 'signup' routes
    api.route('/forgotPass')
        .get(userController.renderforgotPass)
        .post(userController.forgotPass(transporter));

    // Set up the 'signin' routes
    api.route('/signin')
        .get(userController.renderSignin)
        .post(passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/signin',
            successRedirect: '/board',
        }));
    // Set up the 'signout' route
    api.get('/signout', userController.signout);

    // Request for info
    // Set up the 'role' routes
    api.route('/role').get(userController.sendRole);
    // Set up the 'users' routes
    api.route('/users').get(userController.sendUsers);

    // avoid api extra folder for resources
    app.use('/', express.static('public'));
    // Apply the routes to our application with the prefix /api
    app.use('/', api);
}
