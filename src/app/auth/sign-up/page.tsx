import Link from "next/link";

import { handleSignUpForm } from "@/app/auth/sign-up/actions";
import { PageWrapper } from "@/components/PageWrapper";
import { SignUpForm } from "@/modules/auth/components/SignUpForm";
import { SIGN_IN_ROUTE } from "@/modules/auth/constants";

export default async function SignUpPage() {
  return (
    <PageWrapper>
      <div className="flex-center w-full min-h-screen">
        <div className="w-1/3 mx-auto border border-slate-800 rounded-lg p-8">
          <h1 className="text-3xl">Create your account</h1>

          <SignUpForm handleSignUpForm={handleSignUpForm} />

          <div className="mt-8">
            <Link
              href={SIGN_IN_ROUTE}
              className="hover:text-fuchsia-400 transition duration-300"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
