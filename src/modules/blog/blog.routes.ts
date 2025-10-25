import express from "express";
import { zodValidateRequest } from "../../middleware/zodValidateRequest";
import {
  createBlogZodSchema,
  updateBlogZodSchema,
} from "./blog.zod.validation";
import { blogController } from "./blog.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "@prisma/client";

const blogRoute = express.Router();

//Create blog by Admin use checkAuth
blogRoute.post(
  "/",
  checkAuth(Role.ADMIN),
  zodValidateRequest(createBlogZodSchema),
  blogController.createBlog
);

//Public route
blogRoute.get("/", blogController.getAllBlogs);

//Public route
blogRoute.get("/:slug", blogController.getSingleBlog);

//Create blog by Admin use checkAuth
blogRoute.patch(
  "/:slug",
  checkAuth(Role.ADMIN),
  zodValidateRequest(updateBlogZodSchema),
  blogController.updateBlog
);

//Delete blog by Admin use checkAuth
blogRoute.delete("/:slug", checkAuth(Role.ADMIN), blogController.deleteBlog);

export default blogRoute;
