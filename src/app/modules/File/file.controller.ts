import CatchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FileServices } from "./file.service";

const uploadImage = CatchAsync(async (req, res) => {
    console.log(req.file);
  const result = await FileServices.uploadImage(req.file, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const uploadPDF = CatchAsync(async (req, res) => {
  const result = await FileServices.uploadPDF(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const uploadDoc = CatchAsync(async (req, res) => {
  const result = await FileServices.uploadDoc(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const getAllFile = CatchAsync(async (req, res) => {
  const result = await FileServices.getAllFileFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File created successfully",
    data: result,
  });
});

const getSingleFile = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FileServices.getSingleFileFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Files retrieved successfully",
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
  getAllFile,
  getSingleFile,
  updateFile,
  deleteFile,
};
