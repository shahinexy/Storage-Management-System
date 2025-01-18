import { model, Schema } from "mongoose";
import { TFolder } from "./folder.interface";

const folderSchema = new Schema<TFolder>(
    {
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Account"
      },
      isFavorite: {
        type: Boolean,
        default: false
      },
    },
    {
      timestamps: true,
    }
  );

  
  export const FolderModel = model<TFolder>(
    "Folder",
    folderSchema
  );