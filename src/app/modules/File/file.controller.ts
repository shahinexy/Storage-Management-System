import CatchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FileServices } from "./file.service";

const uploadImage = CatchAsync(async (req, res) => {
  const result = await FileServices.uploadImage(req.file, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const uploadPDF = CatchAsync(async (req, res) => {
  const result = await FileServices.uploadPDF(req.file, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const uploadDoc = CatchAsync(async (req, res) => {
  const result = await FileServices.uploadDoc(req.file, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const getAllFileByType = CatchAsync(async (req, res) => {
  const { accountId } = req.user;

  const result = await FileServices.getAllFileByTypeFromDB(accountId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File retrieved successfully",
    data: result,
  });
});

const getSingleFile = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FileServices.getSingleFileFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Files get successfully",
    data: result,
  });
});

const updateFile = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FileServices.updateFileFromDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File updated successfully",
    data: result,
  });
});

const makeFavoriteFile = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FileServices.makeFavoritFileIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Maked favorite successfully",
    data: result,
  });
});

const deleteFile = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FileServices.deleteFileFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File deleted successfully",
    data: result,
  });
});

export const FileControllers = {
  uploadImage,
  uploadPDF,
  uploadDoc,
  getAllFileByType,
  getSingleFile,
  updateFile,
  makeFavoriteFile,
  deleteFile,
};
