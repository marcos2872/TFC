import * as express from 'express';
import getAllTeamsController from '../controller/teamsController';
import { emailValidate, paswdValidate } from '../middlewares/loginValidate';
import { loginController, loginValidateController } from '../controller/loginController';
import tokenValidate from '../middlewares/tokenValidate';

const route = express.Router();

route.post('/login', emailValidate, paswdValidate, loginController);
route.get('/login/validate', tokenValidate, loginValidateController);

route.get('/teams', getAllTeamsController);

export default route;
