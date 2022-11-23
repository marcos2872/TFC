import { Request, Response } from 'express';
import getAllMatchesServices from '../services/matchesServices';

const getAllMatchesController = async (_req: Request, res: Response) => {
  const { statusCode, message } = await getAllMatchesServices();

  res.status(statusCode).json(message);
};

export default getAllMatchesController;
