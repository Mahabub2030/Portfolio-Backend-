import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";

interface GoogleLoginPayload {
  name: string;
  email: string;
  image?: string;
  provider: string;
  providerId: string;
}

const createLogIn = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  // if (!user || user.role !== "ADMIN") {
  //   throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials");
  // }

  // if (user.isStatus === "BLOCKED" || user.isStatus === "INACTIVE") {
  //   throw new AppError(
  //     403,
  //     "Your account is not active. Please contact support."
  //   );
  // }
  // if (user.isDeleted === true) {
  //   throw new AppError(410, "This account has been deleted.");
  // }

  const hashPassword = await bcrypt.compare(password, user?.password as string);
  if (!hashPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  return user;
};

const createLogInGoogle = async (
  payload: GoogleLoginPayload
): Promise<User> => {
  const { name, email, image, provider, providerId } = payload;
  if (!email) {
    throw new AppError(404, "Email is required");
  }

  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        picture: image,
        provider: provider,
        providerId: providerId,
        isVerified: true,
      },
    });
  }
  return user;
};
export const authService = {
  createLogIn,
  createLogInGoogle,
};
