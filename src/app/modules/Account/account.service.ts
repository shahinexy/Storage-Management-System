import calculateStorageUsage from "../../utils/calculateStorageUsage";
import { FileModel } from "../File/file.model";
import { FolderModel } from "../Folder/folder.model";

const acountStatus = async (accountId: string) => {
  const fileUsageStorageInGB = await calculateStorageUsage(
    FileModel,
    accountId
  );

  const folderUsageStorageInGB = await calculateStorageUsage(
    FolderModel,
    accountId
  );

  const usagesStorageInGB = fileUsageStorageInGB + folderUsageStorageInGB;
  const totalStorageInGB = 15;
  const availableStorage = totalStorageInGB - usagesStorageInGB;

  return { totalStorageInGB, usagesStorageInGB, availableStorage };
};

const recentAddedData = async () => {

  const result = await FolderModel.aggregate([
    {
      $match: {}, 
    },
    {
      $project: { _id: 1, name: 1, userId: 1, isFavorite: 1, createdAt: 1 },
    },
    {
      $unionWith: {
        coll: "files", 
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              userId: 1,
              isFavorite: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return result;
};

export const AccountServices = {
  acountStatus,
  recentAddedData,
};
