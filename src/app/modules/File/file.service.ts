/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import AppError from "../../error/AppError";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary";
import { TFile } from "./file.interface";
import { FileModel } from "./file.model";
import { FolderModel } from "../Folder/folder.model";
import mongoose from "mongoose";

const uploadImage = async (file: any, payload: TFile, accountId: string) => {
  const isFolderExists = await FolderModel.findOne({
    _id: payload.folderId,
    userId: accountId,
  });

  if (!isFolderExists) {
    throw new AppError(400, "Create a Folder before uploading file");
  }

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
  payload.userId = new mongoose.Types.ObjectId(accountId);

  const result = await FileModel.create(payload);
  return result;
};

const uploadPDF = async (file: any, payload: TFile, accountId: string) => {
  const isFolderExists = await FolderModel.findOne({
    _id: payload.folderId,
    userId: accountId,
  });

  if (!isFolderExists) {
    throw new AppError(400, "Create a Folder before uploading file");
  }

  const filePath = file.path;
  const fileName = payload.name;
  const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";
  const originalname = file.originalname;

  const extension = path.extname(originalname);

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
  payload.userId = new mongoose.Types.ObjectId(accountId);

  const result = await FileModel.create(payload);
  return result;
};

const uploadDoc = async (file: any, payload: TFile, accountId: string) => {
  const isFolderExists = await FolderModel.findOne({
    _id: payload.folderId,
    userId: accountId,
  });

  if (!isFolderExists) {
    throw new AppError(400, "Create a Folder before uploading file");
  }

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
  payload.userId = new mongoose.Types.ObjectId(accountId);

  const result = await FileModel.create(payload);
  return result;
};

const getAllFileByTypeFromDB = async (
  accountId: { accountId: string },
  query: Record<string, unknown>
) => {
  const result = await FileModel.find({ userId: accountId, ...query });

  const totalItem = result.length;

  const jsonData = JSON.stringify(result);
  const sizeInBytes = Buffer.byteLength(jsonData, "utf8");
  const usagesStorageInGB = sizeInBytes / 1e9;

  return {
    datas: result,
    metaData: {
      totalItem,
      usagesStorageInGB,
    },
  };
};

const getSingleFileFromDB = async (id: string) => {
  const isFileExists = await FileModel.findById(id);
  if (!isFileExists) {
    throw new AppError(404, "File dose not exists");
  }

  const result = await FileModel.findById(id);
  return result;
};

const updateFileFromDB = async (id: string, payload: { name: string }) => {
  const isFileExists = await FileModel.findById(id);
  if (!isFileExists) {
    throw new AppError(404, "File dose not exists");
  }

  const result = await FileModel.findByIdAndUpdate(
    id,
    { name: payload.name },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const makeFavoritFileIntoDB = async (id: string) => {
  const isFileExists = await FileModel.findById(id);
  if (!isFileExists) {
    throw new AppError(404, "File dose not exists");
  }

  const result = await FileModel.findByIdAndUpdate(
    id,
    { isFavorite: !isFileExists.isFavorite },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteFileFromDB = async (id: string) => {
  const isFileExists = await FileModel.findById(id);
  if (!isFileExists) {
    throw new AppError(404, "File dose not exists");
  }

  const result = await FileModel.findByIdAndDelete(id);
  return result;
};

export const FileServices = {
  uploadImage,
  uploadPDF,
  uploadDoc,
  getAllFileByTypeFromDB,
  getSingleFileFromDB,
  updateFileFromDB,
  makeFavoritFileIntoDB,
  deleteFileFromDB,
};
