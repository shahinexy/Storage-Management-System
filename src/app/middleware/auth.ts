import { NextFunction, Request, Response } from "express";
import CatchAsync from "./../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { CreateAccountModel } from "../modules/Auth/auth.model";
import AppError from "../error/AppError";

const Auth = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, "You are not authorize");
    }

    const deocded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { accountId } = deocded;

    // check if the account exists
    const isAccountExists = await CreateAccountModel.findById(accountId);

    if (!isAccountExists) {
      throw new AppError(404, "Account do not exists");
    }

    req.user = deocded as JwtPayload;

    next();
  });
};

export default Auth;
