import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.body.user = user;
    next();
  });
};

export const authorizeRole = (role: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req.body.user.role & role) === role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};
