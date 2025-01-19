import express, { NextFunction, Request, Response } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FileValidations } from "./file.validation";
import { FileControllers } from "./file.controller";
import { upload } from "../../utils/sendFileToCloudinary";
import Auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/upload-image",
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
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(FileValidations.fileValidationSchema),
  FileControllers.uploadDoc
);

router.get("/", Auth(),  FileControllers.getAllFile);

router.get("/:id", FileControllers.getSingleFile);

router.patch("/:id", FileControllers.updateFile);

router.patch("/make-favorite/:id", FileControllers.makeFavoriteFile); 

router.delete("/:id", FileControllers.deleteFile);

export const FileRouters = router;
