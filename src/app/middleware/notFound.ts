/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const NotFound = (req: Request, res: Response, next: NextFunction): any => {
  return res.status(404).json({
    success: false,
    message: "API Not Found",
    error: "",
  });
};

export default NotFound;
