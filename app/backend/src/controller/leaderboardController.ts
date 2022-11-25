import { Request, Response } from 'express';
import { getAllLeaderboardServices,
  leaderboardServicesAway } from '../services/leaderboard.Services';

const getAllLeaderboardController = async (_req: Request, res: Response) => {
  const { statusCode, message } = await getAllLeaderboardServices('home');

  res.status(statusCode).json(message);
};

const leaderboardControllerAway = async (_req: Request, res: Response) => {
  const { statusCode, message } = await leaderboardServicesAway('away');

  res.status(statusCode).json(message);
};

export { getAllLeaderboardController, leaderboardControllerAway };
