import { Request, Response } from 'express';
import { getAllTeamsServices, getIdTeamsServices } from '../services/teamsServices';

const getAllTeamsController = async (_req: Request, res: Response) => {
  const { statusCode, message } = await getAllTeamsServices();

  res.status(statusCode).json(message);
};

const getIdTeamsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, message } = await getIdTeamsServices(Number(id));

  res.status(statusCode).json(message);
};

export { getAllTeamsController, getIdTeamsController };
