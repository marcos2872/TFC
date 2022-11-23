import * as express from 'express';
import { getAllTeamsController, getIdTeamsController } from '../controller/teamsController';
import { emailValidate, paswdValidate } from '../middlewares/loginValidate';
import { loginController, loginValidateController } from '../controller/loginController';
import tokenValidate from '../middlewares/tokenValidate';
import getAllMatchesController from '../controller/matchesController';

const route = express.Router();

// route.get('/matches/search', getFilterMatchesController);

route.post('/login', emailValidate, paswdValidate, loginController);
route.get('/login/validate', tokenValidate, loginValidateController);

route.get('/teams', getAllTeamsController);
route.get('/teams/:id', getIdTeamsController);

route.get('/matches', getAllMatchesController);

export default route;
