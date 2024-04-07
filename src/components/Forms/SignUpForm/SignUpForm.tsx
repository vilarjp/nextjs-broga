"use client";

import { useFormState } from "react-dom";

import { handleSignUpForm } from "@/app/auth/sign-up/actions";
import { Button, Input } from "@/components/Forms";

const initialState = {
  errors: null,
  createdUser: null,
};

export const SignUpForm = () => {
  const [state, formAction] = useFormState(handleSignUpForm, initialState);

  return (
    <form action={formAction}>
      <Input label="Name" name="name" error={state.errors?.name} />

      <Input
        label="E-mail"
        name="email"
        inputMode="email"
        error={state.errors?.email}
      />

      <Input label="Password" name="password" error={state.errors?.password} />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        error={state.errors?.confirmPassword}
      />

      <Button>Sign Up</Button>
    </form>
  );
};
