import express from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth.validation";
import Auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  ValidateRequest(AuthValidations.createAccountValidationSchema),
  AuthControllers.createAccount
);

router.post(
  "/login",
  ValidateRequest(AuthValidations.loginAccountValidationSchema),
  AuthControllers.LoginAccount
);

router.post(
  "/cnahge-password",
  Auth(),
  ValidateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.delete("/delete-account", Auth(), AuthControllers.deleteAccount);

export const AuthRouters = router;
