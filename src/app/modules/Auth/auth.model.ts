import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true, 
  }
);

export const AccountModel = model("Account", accountSchema);
