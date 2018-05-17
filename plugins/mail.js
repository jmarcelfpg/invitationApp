"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    auth: {
        pass: process.env.PASSEMAIL,
        user: process.env.APPEMAIL,
    },
    from: process.env.APPEMAIL,
    service: 'gmail',
});
exports.default = transporter;
//# sourceMappingURL=mail.js.map