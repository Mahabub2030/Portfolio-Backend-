import { Role } from "@prisma/client";
import express from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { zodValidateRequest } from "../../middleware/zodValidateRequest";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.zod.validation";

const userRoute = express.Router();

userRoute.post(
  "/register",
  zodValidateRequest(createUserZodSchema),
  userController.createUser
);

userRoute.get("/", userController.getAllUsers);
userRoute.get("/me", checkAuth(Role.ADMIN), userController.getMe);
userRoute.patch("/:id", userController.updateUser);

export default userRoute;
