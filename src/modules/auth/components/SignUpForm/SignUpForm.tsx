"use client";

import { useFormState } from "react-dom";

import { SignUpFormProps } from "@/app/auth/sign-up/actions";
import { Error } from "@/components/Error";
import { Button, Input } from "@/components/Forms";

const initialState = {
  errors: undefined,
  createdUser: undefined,
};

export const SignUpForm = ({ handleSignUpForm }: SignUpFormProps) => {
  const [state, formAction] = useFormState(handleSignUpForm, initialState);

  const { signUpError, errors } = state;

  return (
    <form action={formAction}>
      <Input label="Name" name="name" error={errors?.name} />

      <Input
        label="E-mail"
        name="email"
        inputMode="email"
        error={errors?.email}
      />

      <Input label="Password" name="password" error={errors?.password} />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        error={errors?.confirmPassword}
      />

      <Button>Sign Up</Button>

      <Error errorMessage={signUpError} />
    </form>
  );
};
