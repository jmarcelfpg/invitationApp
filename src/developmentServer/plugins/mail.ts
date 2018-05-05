import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    auth: {
        pass: process.env.PASSEMAIL,
        user: process.env.APPEMAIL,
    },
    from: process.env.APPEMAIL,
    service: 'gmail',
});
export default transporter;
