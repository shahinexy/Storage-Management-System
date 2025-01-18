import { z } from "zod";

const folderValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    userId: z.string().nonempty("User ID is required"),
  }),
});

export const FolderValidations = {
  folderValidationSchema,
};
