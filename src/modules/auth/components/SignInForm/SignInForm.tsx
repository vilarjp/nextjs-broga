"use client";

import { useFormState } from "react-dom";

import { SignInFormProps } from "@/app/auth/sign-in/actions";
import { Error } from "@/components/Error";
import { Button, Input } from "@/components/Forms";

const initialState = {
  errors: undefined,
};

export const SignInForm = ({ handleSignInForm }: SignInFormProps) => {
  const [state, formAction] = useFormState(handleSignInForm, initialState);

  const { errors, signInError } = state;

  return (
    <form action={formAction}>
      <Input
        label="E-mail"
        name="email"
        inputMode="email"
        error={errors?.email}
      />

      <Input label="Password" name="password" error={errors?.password} />

      <Button>Sign In</Button>

      <Error errorMessage={signInError} />
    </form>
  );
};
