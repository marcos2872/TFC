import * as express from 'express';
import { emailValidate, paswdValidate } from '../middlewares/loginValidate';
import { loginController, loginValidateController } from '../controller/loginController';
import tokenValidate from '../middlewares/tokenValidate';

const route = express.Router();

route.post('/login', emailValidate, paswdValidate, loginController);
route.get('/login/validate', tokenValidate, loginValidateController);

export default route;
