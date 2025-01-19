import express, { NextFunction, Request, Response } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FileValidations } from "./file.validation";
import { FileControllers } from "./file.controller";
import { upload } from "../../utils/sendFileToCloudinary";

const router = express.Router();

router.post(
  "/upload-image",
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
  },
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
