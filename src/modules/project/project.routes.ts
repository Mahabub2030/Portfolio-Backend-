import express from "express";
import { zodValidateRequest } from "../../middleware/zodValidateRequest";
import {
  createProjectZodSchema,
  updateProjectZodSchema,
} from "./project.zod.validation";
import { projectController } from "./project.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "@prisma/client";

const projectRoute = express.Router();

//Create project by Admin use checkAuth
projectRoute.post(
  "/",
  checkAuth(Role.ADMIN),
  zodValidateRequest(createProjectZodSchema),
  projectController.createProject
);

//public Route
projectRoute.get("/", projectController.getAllProjects);

//public Route
projectRoute.get("/:slug", projectController.getSingleProject);

//Update project by Admin use checkAuth
projectRoute.patch(
  "/:slug",
  checkAuth(Role.ADMIN),
  zodValidateRequest(updateProjectZodSchema),
  projectController.updateProject
);

//Delete project by Admin use checkAuth
projectRoute.delete(
  "/:slug",
  checkAuth(Role.ADMIN),
  projectController.deleteProject
);

export default projectRoute;
