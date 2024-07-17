import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Создаем транспортер для отправки писем через SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'mark.ruecker34@ethereal.email',
      pass: 'yRuMUTWJbpv43ZE4ap'
  }
});

export const sendConfirmationEmail = async (to: string, confirmationCode: string) => {
  try {
    // Опции письма
    const mailOptions = {
      from: 'mark.ruecker34@ethereal.email',
      to: to,
      subject: 'Подтверждение регистрации',
      text: `Для завершения регистрации перейдите по ссылке: http://localhost:3000/confirm/${confirmationCode}`,
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);
    console.log(`Письмо для подтверждения отправлено на ${to}`);
  } catch (error) {
    console.error('Ошибка отправки письма подтверждения:', error);
    throw error;
  }
};
