import express, { NextFunction, Request, Response } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FileValidations } from "./file.validation";
import { FileControllers } from "./file.controller";
import { upload } from "../../utils/sendFileToCloudinary";
import Auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/upload-image",
  Auth(),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadImage
);

router.post(
  "/upload-pdf",
  Auth(),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadPDF
);

router.post(
  "/upload-doc",
  Auth(),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadDoc
);

router.get("/", Auth(), FileControllers.getAllFileByType);

router.get("/:id", Auth(), FileControllers.getSingleFile);

router.patch("/:id", Auth(), FileControllers.updateFile);

router.patch("/make-favorite/:id", Auth(), FileControllers.makeFavoriteFile);

router.delete("/:id", Auth(), FileControllers.deleteFile);

export const FileRouters = router;
