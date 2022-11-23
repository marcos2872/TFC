import { Request, Response } from 'express';
import {
  getAllMatchesServices,
  getFilterMatchesServices,
  patchMatcherFinishServices,
  postMatcheServices,
  updateMatchesIdServices } from '../services/matchesServices';

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

const patchMatcherFinishController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { statusCode, message } = await patchMatcherFinishServices(Number(id));

  res.status(statusCode).json(message);
};

const updateMatchesIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { satatusCode, message } = await
  updateMatchesIdServices(Number(id), homeTeamGoals, awayTeamGoals);

  res.status(satatusCode).json(message);
};
export { getAllMatchesController,
  postMatchesController, patchMatcherFinishController, updateMatchesIdController };
