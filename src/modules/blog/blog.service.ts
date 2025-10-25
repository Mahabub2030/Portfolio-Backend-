import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import { generateUniqueSlug } from "../../utils/createSlug";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
  const slug = await generateUniqueSlug(payload?.title);
  const blog = await prisma.blog.create({
    data: {
      slug: slug,
      ...payload,
    },
  });

  return blog;
};

const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs;
};

const getSingleBlog = async (slug: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.blog.update({
      where: { slug: slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const blog = await tx.blog.findUnique({
      where: { slug: slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
      },
    });

    if (!blog) {
      throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }
    return blog;
  });
};

const updateBlog = async (slug: string, payload: Prisma.BlogUpdateInput) => {
  const blog = await prisma.blog.findUnique({ where: { slug: slug } });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  let updateData: Prisma.BlogUpdateInput = { ...payload };

  if (payload?.title && typeof payload.title === "string") {
    const updateSlug = await generateUniqueSlug(payload.title);
    updateData.slug = updateSlug;
  }
  // if (blog.authorId !== userId) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to update this blog');
  // }

  const updatedBlog = await prisma.blog.update({
    where: { slug: slug },
    data: updateData,
  });
  return updatedBlog;
};

const deleteBlog = async (slug: string) => {
  const blog = await prisma.blog.findUnique({ where: { slug: slug } });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  // if (blog.authorId !== userId) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to delete this blog');
  // }

  const deletedBlog = await prisma.blog.delete({
    where: { slug: slug },
  });
  return deletedBlog;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
