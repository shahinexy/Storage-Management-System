import { Schema, model } from "mongoose";
import { TCreateAccount } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const accountSchema = new Schema<TCreateAccount>(
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
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

accountSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const CreateAccountModel = model<TCreateAccount>(
  "Account",
  accountSchema
);
