import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

router.post("/login", authController.createLogIn);
router.post("/logout", authController.logOutUser);
router.post("/google", authController.createLogInGoogle);

export const authRouter = router;
