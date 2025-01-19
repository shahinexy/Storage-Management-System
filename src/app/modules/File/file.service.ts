/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import AppError from "../../error/AppError";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary";
import { TFile } from "./file.interface";
import { FileModel } from "./file.model";

const uploadImage = async (file: any, payload: TFile) => {
  const filepath = file.path;
  const fileName = payload.name;
  const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";
  if (resourceType !== "image") {
    throw new AppError(400, "Invalid file type expected jpeg/jpg or png ");
  }
  const originalname = file.originalname;

  const { secure_url } = await sendFileToCloudinary(
    filepath,
    fileName,
    resourceType,
    originalname
  );

  payload.type = "img";
  payload.path = secure_url;

  const result = await FileModel.create(payload);
  return result;
};

const uploadPDF = async (file: any, payload: TFile) => {
  const filePath = file.path;
  const fileName = payload.name;
  const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";
  const originalname = file.originalname;

  const extension = path.extname(originalname);
  console.log(extension);
  if (extension !== ".pdf") {
    throw new AppError(400, "Invalid file type expected pdf");
  }

  const { secure_url } = await sendFileToCloudinary(
    filePath,
    fileName,
    resourceType,
    originalname
  );

  payload.type = "pdf";
  payload.path = secure_url;

  const result = await FileModel.create(payload);
  return result;
};

const uploadDoc = async (file: any, payload: TFile) => {
  const filePath = file.path;
  const fileName = payload.name;
  const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";
  const originalname = file.originalname;

  const extension = path.extname(originalname);

  if (
    extension == ".pdf" ||
    extension == ".png" ||
    extension == ".jpg" ||
    extension == ".jpeg"
  ) {
    throw new AppError(400, "Invalid file type");
  }

  const { secure_url } = await sendFileToCloudinary(
    filePath,
    fileName,
    resourceType,
    originalname
  );

  payload.type = "doc";
  payload.path = secure_url;

  const result = await FileModel.create(payload);
  return result;
};

const getAllFileFromDB = async () => {
  const result = await FileModel.find();
  return result;
};

const getSingleFileFromDB = async (id: string) => {
  const result = await FileModel.findById(id);
  return result;
};

const updateFileFromDB = async (id: string, payload: { name: string }) => {
  const result = await FileModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const makeFavoritFolderIntoDB = async (id: string) => {
  const result = await FileModel.findByIdAndUpdate(
    id,
    { isFavorite: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteFileFromDB = async (id: string) => {
  const result = await FileModel.findByIdAndDelete(id);
  return result;
};

export const FileServices = {
  uploadImage,
  uploadPDF,
  uploadDoc,
  getAllFileFromDB,
  getSingleFileFromDB,
  updateFileFromDB,
  deleteFileFromDB,
  makeFavoritFolderIntoDB,
};
