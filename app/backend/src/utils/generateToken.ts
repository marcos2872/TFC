import * as jwt from 'jsonwebtoken';

require('dotenv/config');

const secret = process.env.JWT_SECRET as string;

const generateToken = (id: number) =>
  jwt.sign({ data: { userId: id } }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  }) as string;

export default generateToken;
