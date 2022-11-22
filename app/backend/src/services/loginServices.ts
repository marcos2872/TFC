import * as bycrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import LoginModel from '../database/models/loginModel';

type userType = {
  email: string,
  password: string,
  id: number
};

const loginService = async (email: string, password: string) => {
  const user = await LoginModel.findOne({
    where: { email },
  }) as unknown as userType;

  if (bycrypt.compareSync(password, user?.password)) {
    return { statusCode: 200, message: { token: generateToken(user?.id) } };
  }

  return { statusCode: 200, message: 'erro' };
};

export default loginService;
