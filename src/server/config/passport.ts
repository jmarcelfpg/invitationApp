import passport from 'passport';
import mongoose from 'mongoose';
import User, { UserDocumentType } from '../models/user';
import loadStrategy from './strategies/local';

export default async function () {
    passport.serializeUser<UserDocumentType, string>(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser<UserDocumentType, string>(function (id, done) {
        User.findOne({
            _id: id
        }, '-password -salt', function (err, user) {
            if (user){
                done(err, user);
            }
        });
    });
    loadStrategy();
    return true;
}