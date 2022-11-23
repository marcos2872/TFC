import { Request, Response } from 'express';
import {
  getAllMatchesServices,
  getFilterMatchesServices,
  postMatcheServices } from '../services/matchesServices';

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

const postMatchesController = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  const { statusCode, message } = await
  postMatcheServices(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

  res.status(statusCode).json(message);
};

export { getAllMatchesController, postMatchesController };
