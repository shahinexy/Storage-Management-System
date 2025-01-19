import { z } from "zod";

const fileValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    folderId: z.string().nonempty("Folder ID is required"),
  }),
});

const updateFileValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
  }),
});

export const FileValidations = {
  fileValidationSchema,
  updateFileValidationSchema
};
