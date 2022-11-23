import * as jwt from 'jsonwebtoken';

require('dotenv/config');

const secret = process.env.JWT_SECRET as string;

const tokenResolve = (token: string) => {
  const { data } = jwt.verify(token, secret) as { data:{ userId: string } };

  return data.userId;
};

export default tokenResolve;
