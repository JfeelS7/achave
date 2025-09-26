"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const enviarEmail = async (email, nome, codigo) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    const info = await transporter.sendMail({
        from: `"Treinamento" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Seu código para check-in',
        html: `<p>Olá ${nome},</p>
           <p>Seu código para check-in no dia do treinamento é: <b>${codigo}</b></p>`
    });
    console.log('Email enviado:', info.messageId);
};
exports.enviarEmail = enviarEmail;
