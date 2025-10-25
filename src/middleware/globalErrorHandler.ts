import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import AppError from "../errorHelpers/AppError";
import config from "../config";

interface IErrorSources {
  message: string;
  path: string;
}

export const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorSources: IErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = 400;
      const target = (error.meta?.target as string[]) || [];
      message = `${target.join(", ")} already exists!!`;
    } else if (error.code === "P2003") {
      statusCode = 400;
      message = `Foreign key constraint failed on the field: ${error.meta?.field_name}`;
    } else if (error.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    } else {
      statusCode = 400;
      message = `Prisma error occurred: ${error.message}`;
    }
  }

  // Zod validation error
  else if (error.name === "ZodError") {
    statusCode = 400;
    error.issues.forEach((issue: any) =>
      errorSources.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      })
    );
    message = "Validation Error (Zod)";
  }

  // Custom AppError
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Generic JS Error
  else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: config.NODE_ENV === "development" ? error : null,
    stack: config.NODE_ENV === "development" ? error.stack : null,
  });
};
