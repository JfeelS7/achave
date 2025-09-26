import nodemailer from 'nodemailer';

export const enviarEmail = async (email: string, nome: string, codigo: string) => {
  const transporter = nodemailer.createTransport({
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
