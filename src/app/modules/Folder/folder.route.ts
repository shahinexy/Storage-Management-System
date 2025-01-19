import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FolderControllers } from "./folder.controller";
import { FolderValidations } from "./folder.validation";
import Auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/create-folder",
  Auth(),
  ValidateRequest(FolderValidations.folderValidationSchema),
  FolderControllers.createFolder
);

router.get("/", Auth(), FolderControllers.getAllFolder);

router.get("/:id", Auth(), FolderControllers.getSingleFolder);

router.patch("/:id", Auth(), FolderControllers.updateFolder); 

router.patch("/make-favorite/:id", Auth(), FolderControllers.makeFavoriteFolder); 

router.delete("/:id", Auth(), FolderControllers.deleteFolder); 

export const FolderRouters = router;
