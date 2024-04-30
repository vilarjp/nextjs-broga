import Link from "next/link";

import { handleSignInForm } from "@/app/auth/sign-in/actions";
import { PageWrapper } from "@/components/PageWrapper";
import { SignInForm } from "@/modules/auth/components/SignInForm";
import { SIGN_UP_ROUTE } from "@/modules/auth/constants";

export default async function SignInPage() {
  return (
    <PageWrapper>
      <div className="flex-center w-full min-h-screen">
        <div className="w-1/3 mx-auto border border-slate-800 rounded-lg p-8">
          <h1 className="text-3xl">Login to your account</h1>

          <SignInForm handleSignInForm={handleSignInForm} />

          <div className="mt-8">
            <Link
              href={SIGN_UP_ROUTE}
              className="hover:text-fuchsia-400 transition duration-300"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
