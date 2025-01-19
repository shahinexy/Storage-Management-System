import express from "express";
import Auth from "../../middleware/auth";
import { AccountControllers } from "./account.controller";

const router = express.Router();

router.get('/account-status', Auth(), AccountControllers.acountStatus)

export const AccountRouters = router;
