import { Request, Response } from 'express';
import { loginService, loginValidateSrvices } from '../services/loginServices';

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { statusCode, message } = await loginService(email, password);

  res.status(statusCode).json(message);
};

const loginValidateController = async (req: Request, res: Response) => {
  const token = req.header('authorization') as string;

  const { statusCode, message } = await loginValidateSrvices(token);

  res.status(statusCode).json(message);
};

export { loginController, loginValidateController };
