import { Request, Response, NextFunction } from 'express';
import tokenIsValid from '../utils/tokenIsValid';

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization') as string;

  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  const isValid = tokenIsValid(token);

  if (!isValid) {
    return res.status(401).json({
      message: 'Token must be a valid token',
    });
  }

  next();
};

export default tokenValidate;
