import { NextFunction, Request, RequestHandler, Response } from 'express';
import path from 'path';
import { User } from '../plugins/models';

export const list: RequestHandler = (req, res, next) => {
    res.send('respond with a resource');
};
export const logout: RequestHandler = (req, res, next) => {
    if (req.session) {
        req.session.destroy(next);
    }
    res.redirect('/');
};
export const authenticate: RequestHandler = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.send({
            error: 'Please enter your username and password.',
        });
    }
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
};
export const admin: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
};
export const profile: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
};
export const resetPass: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'resetPass.html'));
};
export const register: RequestHandler = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const confirmation = req.body.confirmation;
    const username = req.body.username;
    const role = req.body.role;
    /* transporter.sendMail({
        subject: 'Message',
        text: `confirmation Email`,
        to: email,
    }); */
    res.send(true).status(200);
};
