import { Prisma } from "@prisma/client";
import config from "../config";
import { prisma } from "../config/db";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  try {
    const isAdmin = await prisma.user.findUnique({
      where: {
        email: config.ADMIN_EMAIL,
        role: "ADMIN",
      },
    });
    if (isAdmin) {
      console.log("Admin already exists");
      return;
    }
    const hashPassword = await bcrypt.hash(
      config.ADMIN_PASSWORD,
      Number(config.BCRYPT_SALT_ROUNDS)
    );

    const payload: Prisma.UserCreateInput = {
      name: "Mukit Hossen",
      email: config.ADMIN_EMAIL,
      picture:
        "https://i.pinimg.com/564x/6a/6b/72/6a6b72a2d5a5154b1ab70e341bff7dca.jpg",
      password: hashPassword,
      role: "ADMIN",
      isVerified: true,
      provider: "credentials",
      providerId: config.ADMIN_EMAIL,
    };
    await prisma.user.create({
      data: payload,
    });
  } catch (error) {
    console.error(error);
  }
};
