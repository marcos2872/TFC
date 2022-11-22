import { Request, Response, NextFunction } from 'express';
import * as validator from 'email-validator';

const emailValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (validator.validate(email)) {
    res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default emailValidate;