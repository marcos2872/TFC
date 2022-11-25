import { Request, Response } from 'express';
import { getAllLeaderboardServices,
  leaderboardServicesAway, leaderboardServices } from '../services/leaderboard.Services';

const getAllLeaderboardControllerHome = async (_req: Request, res: Response) => {
  const { statusCode, message } = await getAllLeaderboardServices('home');

  res.status(statusCode).json(message);
};

const leaderboardControllerAway = async (_req: Request, res: Response) => {
  const { statusCode, message } = await leaderboardServicesAway('away');

  res.status(statusCode).json(message);
};

const getAllLeaderboardController = async (_req: Request, res: Response) => {
  const { statusCode, message } = await leaderboardServices();

  res.status(statusCode).json(message);
};

export { getAllLeaderboardControllerHome, leaderboardControllerAway, getAllLeaderboardController };
