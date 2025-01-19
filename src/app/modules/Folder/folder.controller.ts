import CatchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FolderServices } from "./folder.service";

const createFolder = CatchAsync(async (req, res) => {
  const {accountId} = req.user
  const result = await FolderServices.createFolderIntoDB(req.body, accountId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Folder created successfully",
    data: result,
  });
});

const getAllFolder = CatchAsync(async (req, res) => {
  const { accountId } = req.user;
  const result = await FolderServices.getAllFolderFromDB(accountId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Folders retrieved successfully",
    data: result,
  });
});

const getSingleFolder = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FolderServices.getSingleFolderFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Folders retrieved successfully",
    data: result,
  });
});

const updateFolder = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FolderServices.updateFolderFromDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Folder updated successfully",
    data: result,
  });
});

const makeFavoriteFolder = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FolderServices.makeFavoritFolderIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Maked favorite successfully",
    data: result,
  });
});

const deleteFolder = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FolderServices.deleteFolderFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Folder deleted successfully",
    data: result,
  });
});


const duplicateDocument = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FolderServices.duplicateDocument(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "File duplicate successfully",
    data: result,
  });
});

export const FolderControllers = {
  createFolder,
  getAllFolder,
  getSingleFolder,
  updateFolder,
  makeFavoriteFolder,
  deleteFolder,
  duplicateDocument
};
