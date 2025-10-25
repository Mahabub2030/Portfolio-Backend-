import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { generateUniqueSlug } from "../../utils/createSlug";

const createProject = async (
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const slug = await generateUniqueSlug(payload?.title);
  const project = await prisma.project.create({
    data: {
      slug: slug,
      ...payload,
    },
  });
  return project;
};

const getAllProjects = async () => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnail: true,
      frontendRepoUrl: true,
      backendRepoUrl: true,
      liveUrl: true,
      features: true,
      technology: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return projects;
};

const getSingleProject = async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: { slug: slug },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  return project;
};

const updateProject = async (
  slug: string,
  payload: Prisma.ProjectUpdateInput
) => {
  const project = await prisma.project.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  // if (project.authorId !== userId) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     "You are not authorized to update this project"
  //   );
  // }

  let updateData: Prisma.ProjectUpdateInput = { ...payload };

  if (payload?.title && typeof payload.title === "string") {
    const updateSlug = await generateUniqueSlug(payload.title);
    updateData.slug = updateSlug;
  }

  const updatedProject = await prisma.project.update({
    where: { slug: slug },
    data: updateData,
  });
  return updatedProject;
};

const deleteProject = async (slug: string) => {
  const project = await prisma.project.findUnique({ where: { slug: slug } });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  // if (project.authorId !== userId) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     "You are not authorized to delete this project"
  //   );
  // }

  const deletedProject = await prisma.project.delete({
    where: { slug: slug },
  });
  return deletedProject;
};

export const projectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
