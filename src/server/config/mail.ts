import emailverification from 'email-verification';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import User from '../app/models/user';

export default function () {
    const nev = emailverification(mongoose);
    nev.configure({
        persistentUserModel: User,
        tempUserCollection: 'myawesomewebsite_tempusers',
        transportOptions: {
            auth: {
                pass: process.env.PASS_EMAIL,
                user: process.env.APP_EMAIL,
            },
            service: 'Gmail',
        },
        verificationURL: '127.0.0.1/verifyEmail/${URL}',
        verifyMailOptions: {
            from: `${process.env.APP_EMAIL}`,
            html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
            subject: 'Please confirm account',
            text: 'Please confirm your account by clicking the following link: ${URL}'
        },
    }, function errorHandler(error: any, options: any) {
        if (error) {
            throw error;
        }
    });

    const transporter = nodemailer.createTransport({
        auth: {
            pass: process.env.PASS_EMAIL,
            user: process.env.APP_EMAIL,
        },
        from: process.env.APP_EMAIL,
        service: 'gmail',
    });
    return transporter;
}
