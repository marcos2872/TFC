import { Request, Response } from 'express';
import getAllLeaderboardServices from '../services/leaderboard.Services';

const getAllLeaderboardController = async (_req: Request, res: Response) => {
  const { statusCode, message } = await getAllLeaderboardServices();

  res.status(statusCode).json(message);
};

export default getAllLeaderboardController;
