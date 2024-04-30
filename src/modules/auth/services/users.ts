import { User } from "@prisma/client";

import Users from "@/database/users";
import { createHash, verifyHash } from "@/modules/auth/utils/hashPassword";

const usersService = {
  signUp: async (user: Pick<User, "name" | "email" | "password">) => {
    try {
      const hashedPassword = await createHash(user.password);

      if (!hashedPassword) throw Error();

      const createdUser = await Users.create({
        ...user,
        password: hashedPassword,
      });

      return {
        user: {
          name: createdUser.name,
          email: createdUser.email,
          id: createdUser.uuid,
        },
        error: null,
      };
    } catch (error: any) {
      if (error?.message.includes("Unique constraint failed"))
        return { user: null, error: "Email already exists" };

      return {
        user: null,
        error: "Unable to create your account, please try again",
      };
    }
  },
  signIn: async ({ email, password }: { email: string; password: string }) => {
    try {
      const user = await Users.findByEmail(email);

      if (!user) throw new Error("User or password does not match");

      const isValidPassword = await verifyHash(password, user.password);

      if (!isValidPassword) throw new Error("User or password does not match");

      return {
        user: {
          name: user.name,
          email: user.email,
          id: user.uuid,
        },
        error: null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: error?.message || "Unable to sign in, please try again",
      };
    }
  },
};

export default usersService;
