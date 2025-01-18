import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FolderControllers } from "./folder.controller";
import { FolderValidations } from "./folder.validation";

const router = express.Router();

router.post(
  "/create-folder",
  ValidateRequest(FolderValidations.folderValidationSchema),
  FolderControllers.createFolder
);

router.get("/", FolderControllers.getAllFolder);

router.get("/:id", FolderControllers.getSingleFolder);

router.patch("/:id", FolderControllers.updateFolder); 

router.delete("/:id", FolderControllers.deleteFolder); 

export const FolderRouters = router;
