/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../error/AppError";
import { FileModel } from "../File/file.model";
import { TCreateAccount, TLoginAccount } from "./auth.interface";
import { CreateAccountModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { FolderModel } from "../Folder/folder.model";

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

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
) => {
  // check if the account exists
  const isAccountExists = await CreateAccountModel.findById(userData.accountId);

  if (!isAccountExists) {
    throw new AppError(404, "Account dose not exists");
  }

  // check if the password correct
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    isAccountExists.password
  );

  if (!isPasswordMatched) {
    throw new AppError(400, "Password dose not matched");
  }

  // check password and confirmpassword are matched
  if (payload.newPassword !== payload.confirmPassword) {
    throw new AppError(401, "Confirm passwords dose not match");
  }

  // has new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await CreateAccountModel.findOneAndUpdate(
    {
      _id: isAccountExists._id,
      email: isAccountExists.email,
    },
    {
      password: newHashedPassword,
    }
  );

  return null;
};

const deleteAccount = async (accountId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteFiles = await FileModel.deleteMany(
      { userId: accountId },
      { session }
    );

    const delsteFolders = await FolderModel.deleteMany(
      { userId: accountId },
      { session }
    );

    const deleteAccount = await CreateAccountModel.findByIdAndDelete(
      accountId,
      { session }
    );

    await session.commitTransaction();
    await session.endSession();

    return deleteAccount;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const AuthServices = {
  createAccountIntoDB,
  loginAccount,
  changePassword,
  deleteAccount,
};
