import CatchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FolderServices } from "./folder.service";


const createFolder = CatchAsync(async(req, res)=>{
    const result = await FolderServices.createFolderIntoDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Folder created successfully',
        data: result
      })
})

const getAllFolder = CatchAsync(async(req, res)=>{
    const result = await FolderServices.getAllFolderFromDB()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Folder created successfully',
        data: result
      })
})

const getSingleFolder = CatchAsync(async(req, res)=>{
    const {id} = req.params;
    const result = await FolderServices.getSingleFolderFromDB(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Folders retrieved successfully',
        data: result
      })
})

const updateFolder = CatchAsync(async(req, res)=>{
    const {id} = req.params;
    const result = await FolderServices.updateFolderFromDB(id, req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Folder updated successfully',
        data: result
      })
})


const makeFavoriteFolder = CatchAsync(async(req, res)=>{
    const {id} = req.params;
    const result = await FolderServices.makeFavoritFolderFromDB(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Maked favorite successfully',
        data: result
      })
})

const deleteFolder = CatchAsync(async(req, res)=>{
    const {id} = req.params;
    const result = await FolderServices.deleteFolderFromDB(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Folder deleted successfully',
        data: result
      })
})

export const FolderControllers = {
    createFolder,
    getAllFolder,
    getSingleFolder,
    updateFolder,
    makeFavoriteFolder,
    deleteFolder
}