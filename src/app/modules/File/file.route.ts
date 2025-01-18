import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FileValidations } from "./file.validation";
import { FileControllers } from "./file.controller";

const router = express.Router();

router.post(
  "/upload-image",
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadImage
);

router.post(
  "/upload-pdf",
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadPDF
);

router.post(
  "/upload-doc",
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadDoc
);

router.get("/", FileControllers.getAllFile);

router.get("/:id", FileControllers.getSingleFile);

router.patch("/:id", FileControllers.updateFile);

router.delete("/:id", FileControllers.deleteFile);

export const FileRouters = router;
