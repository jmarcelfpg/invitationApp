import * as express from 'express';
import { Express } from 'express-serve-static-core';
import {PassportStatic} from 'passport';
import UserController from '../controllers/userController';
import User from '../models/user';

export default function setAPIRoutes(app: Express, passport: PassportStatic) {
    const api = express.Router();
    const userController = new UserController();

    // Set up the 'signup' routes
    api.route('/signup')
        .get(userController.renderSignup)
        .post(userController.signup);

    // Set up the 'signin' routes
    api.route('/signin')
        .get(userController.renderSignin)
        .post(passport.authenticate('local' , {
            failureFlash: true,
            failureRedirect: '/board',
            successRedirect: '/',
        }));
    // Set up the 'signout' route
    api.get('/signout', userController.signout);

    // avoid api extra folder for resources
    app.use('/', express.static('public'));
    // Apply the routes to our application with the prefix /api
    app.use('/', api);
}
