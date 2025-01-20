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
      $unionWith: {
        coll: "files",
        pipeline: [],
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return result;
};

const favoriteData = async () => {
  const result = await FolderModel.aggregate([
    {
      $match: { isFavorite: true },
    },
    {
      $unionWith: {
        coll: "files",
        pipeline: [
          {
            $match: { isFavorite: true },
          },
        ],
      },
    },
  ]);

  return result;
};

const filterByDate = async (date: string) => {
  const startOfDay = new Date(date);
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

  const result = await FolderModel.aggregate([
    {
      $unionWith: {
        coll: "files",
        pipeline: [],
      },
    },
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
  ]);

  return result;
};

export const AccountServices = {
  acountStatus,
  recentAddedData,
  favoriteData,
  filterByDate,
};
