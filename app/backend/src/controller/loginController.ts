import { Request, Response } from 'express';
import loginService from '../services/loginServices';

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { statusCode, message } = await loginService(email, password);

  res.status(statusCode).json(message);
};

export default loginController;
