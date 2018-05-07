import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import { MongoError } from 'mongodb';
import path from 'path';
import { User } from '../models/user';
import Controller from './abstractController';

type MongooseError = MongoError &
    { errors: { [index: string]: { message: string } } }
export default class UserController extends Controller {
    public model = User;

    public renderBoard: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            // res.sendFile(path.join(__dirname, '..', '..', 'public', 'signin.html'));
            // Use the 'response' object to render the signin page
            res.render('board', {
                // Set the page title variable
                title: 'Board',
                // Set the flash message variable
                messages: req.flash('error') || req.flash('info'),
            });
        } else {
            return res.redirect('/');
        }
    }

    public renderSignin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            // res.sendFile(path.join(__dirname, '..', '..', 'public', 'signin.html'));
            // Use the 'response' object to render the signin page
            res.render('signin', {
                // Set the page title variable
                title: 'Sign-in Form',
                // Set the flash message variable
                messages: req.flash('error') || req.flash('info'),
            });
        } else {
            return res.redirect('/');
        }
    }
    // Create a new controller method that renders the signup page
    public renderSignup: RequestHandler = (req, res, next) => {
        // If user is not connected render the signup page,
        // otherwise redirect the user back to the main application page
        if (!req.user) {
            // Use the 'response' object to render the signup page
            res.render('signup', {
                // Set the flash message variable
                messages: req.flash('error'),
                // Set the page title variable
                title: 'Sign-up Form',
            });
        } else {
            return res.redirect('/');
        }
    }
    // Create a new controller method that creates new 'regular' users
    public signup: RequestHandler = (req, res, next) => {
        // If user is not connected,
        // create and login a new user,
        // otherwise redirect the user back to the main application page
        if (!req.user) {
            // Create a new 'User' model instance
            const user = new User(req.body);
            var message = null;

            // Set the user provider property
            user.provider = 'local';

            // Try saving the new user document
            user.save((err: MongooseError) => {
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
                    if (err) return console.log(err);

                    // Redirect the user back to the main application page
                    return res.redirect('/');
                });
            });
        } else {
            return res.send(true);
        }
    }
    // Create a new controller method for signing out
    public signout: RequestHandler = (req, res) => {
        // Use the Passport 'logout' method to logout
        req.logout();
        // Redirect the user back to the main application page
        res.redirect('/');
    }
    // Create a new error handling controller method
    private getErrorMessage = function ({ code, errors }: MongooseError) {
        const error = errors ? Object.values(errors).find((value) => !!value.message)
        : undefined;
        return code
            ? (code === 11000 || code === 11001)
                ? 'Username already exists' : 'Something went wrong'
            : error ? error.message : 'Something is bad in the code';
    };
}
