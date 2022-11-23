import { Request, Response } from 'express';
import { getAllMatchesServices, getFilterMatchesServices } from '../services/matchesServices';

const getAllMatchesController = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress) {
    const { statusCode, message } = await
    getFilterMatchesServices(inProgress === 'true');

    return res.status(statusCode).json(message);
  }
  const { statusCode, message } = await getAllMatchesServices();

  return res.status(statusCode).json(message);
};

export default getAllMatchesController;
