import { NextFunction, RequestHandler, Request, Response } from "express";

const CatchAsync = (fu: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fu(req, res, next)).catch((err) => next(err));
  };
};

export default CatchAsync;