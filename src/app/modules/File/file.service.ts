/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary";
import { TFile } from "./file.interface";
import { FileModel } from "./file.model";

const uploadImage = async (file: any, payload: TFile) => {
  const path = file.path;
  const fileName = payload.name;

  const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";

  const { secure_url } = await sendFileToCloudinary(path, fileName, resourceType, file.originalname);

  payload.type = "img";
  payload.path = secure_url;

  const result = await FileModel.create(payload);
  return result;
};

const uploadPDF = async (payload: TFile) => {
  payload.type = "pdf";
  const result = await FileModel.create(payload);
  return result;
};

const uploadDoc = async (payload: TFile) => {
  payload.type = "doc";
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
};
