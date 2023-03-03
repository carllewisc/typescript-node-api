import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

type MyRequest = Request & { user: JwtPayload | string };

const verifyJWT = (req: MyRequest, res: Response, next: NextFunction) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied',
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export { verifyJWT };
