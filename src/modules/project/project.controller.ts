import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { projectService } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  // const userId = req.user?.userId as string;
  const result = await projectService.createProject(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully!",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  // const userId = req.user?.userId as string;
  const result = await projectService.getAllProjects();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully!",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  // const userId = req.user?.userId as string;
  const slug = req.params.slug;
  const result = await projectService.getSingleProject(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully!",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  // const userId = req.user?.userId as string;
  const slug = req.params.slug;
  const result = await projectService.updateProject(slug, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Update successfully!",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  // const userId = req.user?.userId as string;
  const slug = req.params.slug;
  const result = await projectService.deleteProject(slug);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Deleted successfully!",
    data: result,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
