import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  create: async (user: Pick<User, "name" | "email" | "password">) => {
    return await prisma.user.create({
      data: user,
    });
  },
};
