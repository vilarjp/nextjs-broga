import { Button, Input } from "@/components/Forms";
import { PageWrapper } from "@/components/PageWrapper";

export default async function SignUpPage() {
  return (
    <PageWrapper>
      <div className="flex-center w-full min-h-screen">
        <div className="w-1/3 mx-auto border border-slate-800 rounded-lg p-8">
          <h1 className="text-3xl">Create your account</h1>

          <form>
            <Input label="Name" name="name" />

            <Input label="E-mail" name="email" inputMode="email" />

            <Input label="Password" name="Password" />

            <Input label="Confirm Password" name="confirmPassword" />

            <Button>Sign Up</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
