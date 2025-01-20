import AppError from "../../error/AppError";
import { FileModel } from "../File/file.model";
import { FolderModel } from "../Folder/folder.model";
import calculateStorageUsage from "./account.utils";

const acountStatus = async (accountId: string) => {
  const fileUsageStorageInGB = await calculateStorageUsage(
    FileModel,
    accountId
  );

  const folderUsageStorageInGB = await calculateStorageUsage(
    FolderModel,
    accountId
  );

  const usagesStorageInGB = fileUsageStorageInGB + folderUsageStorageInGB || 0;
  const totalStorageInGB = 15;
  const availableStorage = totalStorageInGB - usagesStorageInGB || 0;

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
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isValidDate) {
    throw new AppError(400, "Invalid date format. Expected format is 'YYYY-MM-DD'.");
  }

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
