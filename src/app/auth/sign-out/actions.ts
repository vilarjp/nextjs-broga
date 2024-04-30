"use server";

import { deleteSession } from "@/modules/auth/utils/cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleSignOut = () => {
  deleteSession();

  revalidatePath("/");

  redirect("/");
};
