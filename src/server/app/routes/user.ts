import { NextFunction, Request, RequestHandler, Response } from 'express';
import path from 'path';
import { User } from '../models/User';

export const list: RequestHandler = (req, res, next) => {
    res.send('respond with a resource');
};
export const logout: RequestHandler = (req, res, next) => {
    // if (req.session) {
    //     req.session.destroy(next);
    // }
    res.redirect('/signin');
};
export const signin: RequestHandler = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.send({
            error: 'Please enter your username and password.',
        });
    }
    res.redirect('/board');
/*
    User.findOne({
        password: req.body.password,
        username: req.body.username,
    })
        .then((user) => {
            if (!user) {
                return res.send({ error: 'Incorrect username & password combination.' });
            }
            if (req.session) {
                req.session.user = user;
                req.session.role = user.role;
            }
            res.redirect('/board');
        })
        .catch(next);
*/
};
export const signup: RequestHandler = (req, res, next) => {
    const { email, password,
        name, lastName,
        contact, confirmation,
        username, role } = req.body;

    /* transporter.sendMail({
        subject: 'Message',
        text: `confirmation Email`,
        to: email,
    }); */
    res.send(true).status(200);
};
