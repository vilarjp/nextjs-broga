import { redirect } from "next/navigation";

import { PageWrapper } from "@/components/PageWrapper";
import { getSession } from "@/modules/auth/utils/cookies";

export default async function User() {
  const user = await getSession();

  if (!user) redirect("/auth/sign-in");

  return (
    <PageWrapper>
      <div className="container mx-auto my-6">
        <div className="w-2/3">
          <h1 className="text-3xl my-6">Account</h1>
          <div className="my-6 flex flex-col">
            <p className="my-2 p-2">Hello, {user.name}</p>
            <p className="my-2">Your e-mail is: {user.email}</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
