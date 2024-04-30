"use client";

import { handleSignOut } from "@/app/auth/sign-out/actions";
import { Button } from "@/components/Forms";

export const SignOutForm = () => {
  return (
    <form action={handleSignOut}>
      <Button className="bg-transparent hover:bg-transparent">Sign Out</Button>
    </form>
  );
};
