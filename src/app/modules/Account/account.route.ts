import express from "express";
import Auth from "../../middleware/auth";
import { AccountControllers } from "./account.controller";

const router = express.Router();

router.get("/account-status", Auth(), AccountControllers.acountStatus);

router.get("/recent-added", Auth(), AccountControllers.recentAddedData);

router.get("/favorite", Auth(), AccountControllers.favoriteData);

export const AccountRouters = router;
