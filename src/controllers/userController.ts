import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';
import { User } from '../models/user';
import { sendConfirmationEmail } from '../utils/emailUtils';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Генерируем код подтверждения (можно использовать библиотеку uuid для генерации уникальных кодов)
    const confirmationCode = 'unique';

    // Сохраняем пользователя в базе данных с неподтвержденным email
    const newUser: User = await db.one(
      'INSERT INTO users(username, password, email, role, confirmed, confirmationCode) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, username, email',
      [username, hashedPassword, email, 0, false, confirmationCode]
    );

    // Отправляем письмо с подтверждением
    await sendConfirmationEmail(newUser.email, confirmationCode);

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      message: 'Пользователь зарегистрирован. Проверьте ваш email для завершения регистрации.',
    });
  } catch (error) {
    console.error('Ошибка регистрации пользователя:', error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  const { confirmationCode } = req.params;

  try {
    // Найдем пользователя по confirmationCode и пометим его как подтвержденного
    const result = await db.result(
      'UPDATE users SET confirmed = $1 WHERE confirmationCode = $2',
      [true, confirmationCode]
    );

    if (result.rowCount === 1) {
      res.status(200).json({ message: 'Email успешно подтвержден' });
    } else {
      res.status(404).json({ error: 'Неверный код подтверждения' });
    }
  } catch (error) {
    console.error('Ошибка при подтверждении email:', error);
    res.status(500).json({ error: 'Ошибка при подтверждении email' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await db.one(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, email, role',
      [role, id]
    );
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
