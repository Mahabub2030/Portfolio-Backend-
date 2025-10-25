import z from "zod";

export const createProjectZodSchema = z.object({
  ownerId: z.number().optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  thumbnail: z.string({ required_error: "Thumbnail is required" }),
  frontendRepoUrl: z
    .string()
    .url("Frontend repo must be a valid URL")
    .optional()
    .nullable(),
  backendRepoUrl: z
    .string()
    .url("Backend repo must be a valid URL")
    .optional()
    .nullable(),
  liveUrl: z.string().url("Live URL must be a valid URL").optional().nullable(),
  features: z.array(z.string()).optional(),
  technology: z.array(z.string()).optional(),
});

export const updateProjectZodSchema = z.object({
  ownerId: z.number().optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .optional(),
  thumbnail: z.string({ required_error: "Thumbnail is required" }).optional(),
  frontendRepoUrl: z
    .string()
    .url("Frontend repo must be a valid URL")
    .optional()
    .nullable(),
  backendRepoUrl: z
    .string()
    .url("Backend repo must be a valid URL")
    .optional()
    .nullable(),
  liveUrl: z.string().url("Live URL must be a valid URL").optional().nullable(),
  features: z.array(z.string()).optional(),
  technology: z.array(z.string()).optional(),
});
