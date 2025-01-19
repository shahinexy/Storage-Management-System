import { model, Schema } from "mongoose";
import { TFile } from "./file.interface";

const fileSchema = new Schema<TFile>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["img", "pdf", "doc"],
      required: true
    },
    path: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const FileModel = model<TFile>("File", fileSchema);
