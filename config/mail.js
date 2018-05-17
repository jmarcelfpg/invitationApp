"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_verification_1 = __importDefault(require("email-verification"));
const mongoose_1 = __importDefault(require("mongoose"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("../app/models/user"));
function default_1() {
    const nev = email_verification_1.default(mongoose_1.default);
    nev.configure({
        persistentUserModel: user_1.default,
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
    }, function errorHandler(error, options) {
        if (error) {
            throw error;
        }
    });
    const transporter = nodemailer_1.default.createTransport({
        auth: {
            pass: process.env.PASS_EMAIL,
            user: process.env.APP_EMAIL,
        },
        from: process.env.APP_EMAIL,
        service: 'gmail',
    });
    return transporter;
}
exports.default = default_1;
//# sourceMappingURL=mail.js.map