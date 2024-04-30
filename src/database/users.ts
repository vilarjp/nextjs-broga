import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const usersDB = {
  create: async (user: Pick<User, "name" | "email" | "password">) => {
    return await prisma.user.create({
      data: user,
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};

export default usersDB;
