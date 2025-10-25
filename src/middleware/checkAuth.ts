import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, "Access token is missing");
      }
      const verify_token = verifyToken(
        token,
        config.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!verify_token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid access token");
      }

      if (verify_token.role !== "ADMIN") {
        throw new AppError(403, "Forbidden - Admins only");
      }
      const isExistUser = await prisma.user.findUnique({
        where: {
          email: verify_token.email,
        },
      });
      if (!isExistUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
      }
      if (
        isExistUser.isStatus === "BLOCKED" ||
        isExistUser.isStatus === "INACTIVE"
      ) {
        throw new AppError(
          403,
          "Your account is not active. Please contact support."
        );
      }
      if (isExistUser.isDeleted === true) {
        throw new AppError(410, "This account has been deleted.");
      }
      if (!authRoles.includes(verify_token.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You do not have permission to access this resource"
        );
      }
      req.user = verify_token;
      next();
    } catch (error) {
      next(error);
    }
  };
