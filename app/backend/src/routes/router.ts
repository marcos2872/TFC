import * as express from 'express';
import { getAllTeamsController, getIdTeamsController } from '../controller/teamsController';
import { emailValidate, paswdValidate } from '../middlewares/loginValidate';
import { loginController, loginValidateController } from '../controller/loginController';
import tokenValidate from '../middlewares/tokenValidate';

const route = express.Router();

route.post('/login', emailValidate, paswdValidate, loginController);
route.get('/login/validate', tokenValidate, loginValidateController);

route.get('/teams', getAllTeamsController);
route.get('/teams/:id', getIdTeamsController);

export default route;
