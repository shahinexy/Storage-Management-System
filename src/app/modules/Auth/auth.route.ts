import express from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth.validation";

const router = express.Router();

router.post("/register", ValidateRequest(AuthValidations.createAccountValidationSchema), AuthControllers.createAccount);

router.post("/login", ValidateRequest(AuthValidations.loginAccountValidationSchema), AuthControllers.LoginAccount);

export const AuthRouters = router;
