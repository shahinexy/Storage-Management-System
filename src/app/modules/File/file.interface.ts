import { Types } from "mongoose";

export type TFile = {
  name: string;
  type: "img" | "pdf" | "doc";
  path: string;
  folderId: Types.ObjectId;
  userId: Types.ObjectId;
  isFavorite?: boolean;
};
