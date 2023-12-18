import jwt from 'jsonwebtoken';
import { expressjwt} from "express-jwt";

const secretKey = 'secretKey';

export const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
  return token;
};

export const verifyToken = expressjwt({ secret: secretKey, algorithms: ['HS256'] });
