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


export const AccountServices = {
  acountStatus,
};
