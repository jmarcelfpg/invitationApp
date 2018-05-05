import * as express from 'express'
import { Express } from 'express-serve-static-core';
import UserController from '../controllers/userController';
import User from '../models/user';
import * as passport from 'passport'

export default function setAPIRoutes(app: Express) {
    const api = express.Router();
    const userController = new UserController();

    // Set up the 'signup' routes 
    api.route('/signup')
        .get(userController.renderSignup)
        .post(userController.signup);

    // Set up the 'signin' routes 
    api.route('/signin')
        .get(userController.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    // Set up the 'signout' route
    api.get('/signout', userController.signout);
    // Apply the routes to our application with the prefix /api
    app.use('/api', api)
}
