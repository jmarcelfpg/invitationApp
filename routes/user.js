"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const models_1 = require("../plugins/models");
exports.list = (req, res, next) => {
    res.send('respond with a resource');
};
exports.logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy(next);
    }
    res.redirect('/');
};
exports.authenticate = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.send({
            error: 'Please enter your username and password.',
        });
    }
    models_1.User.findOne({
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
exports.admin = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'admin.html'));
};
exports.profile = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'profile.html'));
};
exports.resetPass = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'resetPass.html'));
};
exports.register = (req, res, next) => {
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
//# sourceMappingURL=user.js.map