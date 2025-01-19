/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import fs from "fs";
import path from "path";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendFileToCloudinary = async (
  filePath: string,
  fileName: string,
  fileType: "image" | "raw",
  originalname: string
) => {
  const extension = path.extname(originalname);

  const publicId = `${fileName}${extension}`;

  const uploadResult = await cloudinary.uploader
    .upload(filePath, {
      public_id: publicId,
      resource_type: fileType,
    })
    .catch((error) => {
      console.log(error);
    });

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file deleted");
    }
  });

  console.log(uploadResult);
  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// File Filter for Specific MIME Types
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Unsupported file type"), false); // Reject file
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
