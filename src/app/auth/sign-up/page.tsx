import { SignUpForm } from "@/components/Forms";
import { PageWrapper } from "@/components/PageWrapper";

export default async function SignUpPage() {
  return (
    <PageWrapper>
      <div className="flex-center w-full min-h-screen">
        <div className="w-1/3 mx-auto border border-slate-800 rounded-lg p-8">
          <h1 className="text-3xl">Create your account</h1>

          <SignUpForm />
        </div>
      </div>
    </PageWrapper>
  );
}
