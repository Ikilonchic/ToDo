import { Request, Response, NextFunction } from 'express';

type MiddlewareFunction = undefined | Response | void;

export default async function (req: Request, res: Response, next: NextFunction): Promise<MiddlewareFunction> {
  if(req.cookies.userID) {
    next();
  } else {
    return res.status(401).json({ msg: 'U are not login' });
  }
}