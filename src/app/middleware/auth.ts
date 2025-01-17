import { NextFunction, Request, Response } from "express";
import CatchAsync from "./../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const Auth = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("You are not authorize");
    }

    const deocded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { accountEmail, accountId } = deocded;

    req.user = deocded as JwtPayload;

    next();
  });
};

export default Auth;
