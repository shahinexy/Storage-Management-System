import mongoose from "mongoose";
import AppError from "../../error/AppError";
import { TFolder } from "./folder.interface";
import { FolderModel } from "./folder.model";

const createFolderIntoDB = async (payload: TFolder, accountId: string) => {
  payload.userId = new mongoose.Types.ObjectId(accountId);

  const result = await FolderModel.create(payload);
  return result;
};

const getAllFolderFromDB = async (accountId: string) => {
  const result = await FolderModel.find({ userId: accountId });

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

const getSingleFolderFromDB = async (id: string) => {
  const isFolderExists = await FolderModel.findById(id);
  if (!isFolderExists) {
    throw new AppError(404, "Folder dose not exists");
  }

  const result = await FolderModel.findById(id);
  return result;
};

const updateFolderFromDB = async (id: string, payload: { name: string }) => {
  const isFolderExists = await FolderModel.findById(id);
  if (!isFolderExists) {
    throw new AppError(404, "Folder dose not exists");
  }

  const result = await FolderModel.findByIdAndUpdate(
    id,
    { name: payload.name },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const makeFavoritFolderIntoDB = async (id: string) => {
  const isFolderExists = await FolderModel.findById(id);
  if (!isFolderExists) {
    throw new AppError(404, "Folder dose not exists");
  }

  const result = await FolderModel.findByIdAndUpdate(
    id,
    { isFavorite: !isFolderExists.isFavorite },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteFolderFromDB = async (id: string) => {
  const isFolderExists = await FolderModel.findById(id);
  if (!isFolderExists) {
    throw new AppError(404, "Folder dose not exists");
  }

  const result = await FolderModel.findByIdAndDelete(id);
  return result;
};

const duplicateDocument = async (id: string) => {
  const file = await FolderModel.findById(id);
  if (!file) {
    throw new AppError(404, "File dose not found");
  }

  const { _id, createdAt, updatedAt, ...restFolderData } = file.toObject();

  const duplicatedFile = new FolderModel(restFolderData);
  await duplicatedFile.save();

  return duplicatedFile;
};

export const FolderServices = {
  createFolderIntoDB,
  getAllFolderFromDB,
  getSingleFolderFromDB,
  updateFolderFromDB,
  makeFavoritFolderIntoDB,
  deleteFolderFromDB,
  duplicateDocument
};
