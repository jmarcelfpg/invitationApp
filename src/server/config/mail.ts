import nodemailer from 'nodemailer';

export default function() {
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
