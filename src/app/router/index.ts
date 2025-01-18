import express from "express";
import { AuthRouters } from "../modules/Auth/auth.route";
import { FolderRouters } from "../modules/Folder/folder.route";
import { FileRouters } from "../modules/File/file.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouters,
  },
  {
    path: "/folders",
    router: FolderRouters,
  },
  {
    path: "/files",
    router: FileRouters,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
