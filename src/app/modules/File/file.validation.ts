import { z } from "zod";

const fileValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    path: z.string().nonempty("Path is required"),
    userId: z.string().nonempty("User ID is required"),
    folderId: z.string().nonempty("Folder ID is required"),
  }),
});

export const FileValidations = {
  fileValidationSchema,
};
