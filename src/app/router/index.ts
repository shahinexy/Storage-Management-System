import express from "express";
import { AuthRouters } from "../modules/Auth/auth.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouters,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
