import z from "zod";

export const createBlogZodSchema = z.object({
  authorId: z.number().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  excerpt: z
    .string()
    .max(300, "Excerpt must be less than 300 characters")
    .optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export const updateBlogZodSchema = z.object({
  authorId: z.number().optional(),
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  excerpt: z
    .string()
    .max(300, "Excerpt must be less than 300 characters")
    .optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});
