import * as express from 'express';
import emailValidate from '../middlewares/loginValidate';
import loginController from '../controller/loginController';

const route = express.Router();

route.post('/login', emailValidate, loginController);

export default route;
