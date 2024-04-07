import { User } from "@prisma/client";

import Users from "@/libs/database/users";
import { createHash } from "@/utils/hash";

export default {
  signUp: async (user: Pick<User, "name" | "email" | "password">) => {
    const hashedPassword = await createHash(user.password);

    if (!hashedPassword) throw new Error("Failed to hash password");

    return await Users.create({
      ...user,
      password: hashedPassword,
    });
  },
};
