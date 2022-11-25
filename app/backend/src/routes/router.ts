import * as express from 'express';
import { getAllLeaderboardController, getAllLeaderboardControllerHome,
  leaderboardControllerAway } from '../controller/leaderboardController';
import { getAllTeamsController, getIdTeamsController } from '../controller/teamsController';
import { emailValidate, paswdValidate } from '../middlewares/loginValidate';
import { loginController, loginValidateController } from '../controller/loginController';
import tokenValidate from '../middlewares/tokenValidate';
import { getAllMatchesController,
  patchMatcherFinishController,
  postMatchesController,
  updateMatchesIdController } from '../controller/matchesController';

const route = express.Router();

route.post('/login', emailValidate, paswdValidate, loginController);
route.get('/login/validate', tokenValidate, loginValidateController);

route.get('/teams', getAllTeamsController);
route.get('/teams/:id', getIdTeamsController);

route.get('/matches', getAllMatchesController);
route.post('/matches', tokenValidate, postMatchesController);
route.patch('/matches/:id/finish', patchMatcherFinishController);
route.patch('/matches/:id', updateMatchesIdController);

route.get('/leaderboard/home', getAllLeaderboardControllerHome);
route.get('/leaderboard/away', leaderboardControllerAway);

route.get('/leaderboard', getAllLeaderboardController);

export default route;
