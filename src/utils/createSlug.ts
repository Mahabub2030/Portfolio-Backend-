import slugify from "slugify";

export const generateUniqueSlug = async (title: string) => {
  const slug = slugify(title, { lower: true, strict: true, trim: true });
  const timestamp = Date.now();
  const uniqueSlug = `${slug}-${timestamp}`;
  return uniqueSlug;
};
