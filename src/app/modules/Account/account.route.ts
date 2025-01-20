import express from "express";
import Auth from "../../middleware/auth";
import { AccountControllers } from "./account.controller";

const router = express.Router();

router.get("/status", Auth(), AccountControllers.acountStatus);

router.get("/recent-data", Auth(), AccountControllers.recentAddedData);

router.get("/favorite", Auth(), AccountControllers.favoriteData);

router.get("/data", Auth(), AccountControllers.filterByDate);

export const AccountRouters = router;
