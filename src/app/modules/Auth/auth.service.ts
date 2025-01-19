import config from "../../config";
import AppError from "../../error/AppError";
import { TCreateAccount, TLoginAccount } from "./auth.interface";
import { CreateAccountModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createAccountIntoDB = async (payload: TCreateAccount) => {
  // if email exist
  const isAccountExists = await CreateAccountModel.findOne({
    email: payload.email,
  });

  if (isAccountExists) {
    throw new AppError(403, "This Account already exists");
  }

  // check password and confirmpassword are matched
  if (payload.password !== payload.confirmPassword) {
    throw new AppError(401, "Passwords do not match");
  }

  const result = await CreateAccountModel.create(payload);
  return result;
};

const loginAccount = async (payload: TLoginAccount) => {
  // if email exist
  const isAccountExist = await CreateAccountModel.findOne({
    email: payload.email,
  });

  if (!isAccountExist) {
    throw new AppError(404, "This Account do not exists");
  }

  // check if password matched
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isAccountExist?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Password do not matched");
  }

  const jwtPayload = {
    accountEmail: isAccountExist.email,
    accountName: isAccountExist.name,
    accountId: isAccountExist._id,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  createAccountIntoDB,
  loginAccount,
};
