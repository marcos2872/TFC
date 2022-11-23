import { Request, Response } from 'express';
import getAllTeamsServices from '../services/teamsServices';

const getAllTeamsController = async (_req: Request, res: Response) => {
  const { statusCode, message } = await getAllTeamsServices();

  res.status(statusCode).json(message);
};

export default getAllTeamsController;
