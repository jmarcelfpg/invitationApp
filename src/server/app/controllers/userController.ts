import User from '../models/user';
import { Request, Response, NextFunction, RequestHandler } from 'express-serve-static-core';
import Controller from './abstractController';
import { MongoError } from 'mongodb';

type MongooseError = MongoError & { errors: { [index: string]: { message: string } } }
export default class UserController extends Controller {
    public model = User

    // Create a new error handling controller method
    private getErrorMessage = function ({ code, errors }: MongooseError) {
        return code
            ? (code === 11000 || code === 11001)
                ? 'Username already exists'
                : 'Something went wrong'
            : Object.values(errors).find(error => !!error.message)!.message;
    };
    public renderSignin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            // Use the 'response' object to render the signin page
            res.render('signin', {
                // Set the page title variable
                title: 'Sign-in Form',
                // Set the flash message variable
                messages: req.flash('error') || req.flash('info')
            });
        } else {
            return res.redirect('/');
        }
    };
    // Create a new controller method that renders the signup page
    public renderSignup: RequestHandler = (req, res, next) => {
        // If user is not connected render the signup page, otherwise redirect the user back to the main application page
        if (!req.user) {
            // Use the 'response' object to render the signup page
            res.render('signup', {
                // Set the page title variable
                title: 'Sign-up Form',
                // Set the flash message variable
                messages: req.flash('error')
            });
        } else {
            return res.redirect('/');
        }
    };
    // Create a new controller method that creates new 'regular' users
    public signup: RequestHandler = (req, res, next) => {
        // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
        if (!req.user) {
            // Create a new 'User' model instance
            var user = new User(req.body);
            var message = null;

            // Set the user provider property
            user.provider = 'local';

            // Try saving the new user document
            user.save()
                .catch((err: MongooseError) => {
                    // If an error occurs, use flash messages to report the error
                    if (err) {
                        // Use the error handling method to get the error message
                        var message = this.getErrorMessage(err);

                        // Set the flash messages
                        req.flash('error', message);

                        // Redirect the user back to the signup page
                        return res.redirect('/signup');
                    }

                    // If the user was created successfully use the Passport 'login' method to login
                    req.login(user, function (err) {
                        // If a login error occurs move to the next middleware
                        if (err) return next(err);

                        // Redirect the user back to the main application page
                        return res.redirect('/');
                    });
                });
        } else {
            return res.redirect('/');
        }
    };
    // Create a new controller method for signing out
    public signout: RequestHandler = (req, res) => {
        // Use the Passport 'logout' method to logout
        req.logout();
        // Redirect the user back to the main application page
        res.redirect('/');
    };
}
