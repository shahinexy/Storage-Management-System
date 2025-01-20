import CatchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createAccount = CatchAsync(async (req, res) => {
  const result = await AuthServices.createAccountIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account created successfully",
    data: result,
  });
});

const LoginAccount = CatchAsync(async (req, res) => {
  const result = await AuthServices.loginAccount(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Logged in Successfully",
    data: result,
  });
});

const changePassword = CatchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed Successfully",
    data: result,
  });
});

export const AuthControllers = {
  createAccount,
  LoginAccount,
  changePassword,
};
