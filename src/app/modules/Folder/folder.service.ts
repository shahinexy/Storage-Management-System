import { TFolder } from "./folder.interface";
import { FolderModel } from "./folder.model";

const createFolderIntoDB = async (payload: TFolder) => {
  const result = await FolderModel.create(payload);
  return result;
};

const getAllFolderFromDB = async () => {
  const result = await FolderModel.find();
  return result;
};

const getSingleFolderFromDB = async (id: string) => {
  const result = await FolderModel.findById(id);
  return result;
};

const updateFolderFromDB = async (id: string, payload: { name: string }) => {
  const result = await FolderModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const makeFavoritFolderIntoDB = async (id: string) => {
  const result = await FolderModel.findByIdAndUpdate(
    id,
    { isFavorite: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteFolderFromDB = async (id: string) => {
  const result = await FolderModel.findByIdAndDelete(id);
  return result;
};

export const FolderServices = {
  createFolderIntoDB,
  getAllFolderFromDB,
  getSingleFolderFromDB,
  updateFolderFromDB,
  makeFavoritFolderIntoDB,
  deleteFolderFromDB,
};
