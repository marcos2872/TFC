import * as bycrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import LoginModel from '../database/models/Users';
import tokenResolve from '../utils/tokenResolve';

type userType = {
  email: string,
  password: string,
  id: number,
  role: string,
};

const loginService = async (email: string, password: string) => {
  const user = await LoginModel.findOne({
    where: { email },
  }) as unknown as userType;

  if (!user) {
    return { statusCode: 401, message: { message: 'Incorrect email or password' } };
  }

  if (!await bycrypt.compare(password, user?.password)) {
    return { statusCode: 401, message: { message: 'Incorrect email or password' } };
  }

  return { statusCode: 200, message: { token: generateToken(user?.id) } };
};

const loginValidateSrvices = async (token: string) => {
  const id = tokenResolve(token);
  const user = await LoginModel.findOne({
    where: { id },
  }) as unknown as userType;

  return { statusCode: 200, message: { role: user.role } };
};

export { loginService, loginValidateSrvices };
