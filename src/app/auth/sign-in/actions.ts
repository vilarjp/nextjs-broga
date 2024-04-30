"use server";

import zod, { ZodError } from "zod";

import UsersService from "@/modules/auth/services/users";
import { createSession } from "@/modules/auth/utils/cookies";
import { encryptJwt } from "@/modules/auth/utils/jwt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ValidationErrors = {
  email: string;
  password: string;
};

type SignInFormData = {
  errors?: ValidationErrors;
  signInError?: string;
};

export type SignInFormProps = {
  handleSignInForm: (
    _: SignInFormData,
    formData: FormData
  ) => Promise<SignInFormData>;
};

type ValidateSignInForm = {
  hasErrors: boolean;
  errors?: ValidationErrors;
};

const userSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1, "Password must not be empty"),
});

const validateSignInForm = (formData: FormData): ValidateSignInForm => {
  try {
    userSchema.parse(Object.fromEntries(formData));

    return {
      hasErrors: false,
    };
  } catch (error) {
    const isZodError = error instanceof ZodError;

    if (isZodError) {
      const { fieldErrors } = error.flatten();

      const errors = Object.keys(fieldErrors).reduce((error, key) => {
        const errorMessage = fieldErrors[key]?.at(0);
        return { ...error, [key]: errorMessage };
      }, {} as ValidationErrors);

      return {
        hasErrors: true,
        errors: { ...errors },
      };
    }

    return {
      hasErrors: true,
      errors: {
        email: "Unknown error, please check your data and try again",
        password: "Unknown error, please check your data and try again",
      },
    };
  }
};

export const handleSignInForm = async (
  _: SignInFormData,
  formData: FormData
): Promise<SignInFormData> => {
  const { hasErrors, errors } = validateSignInForm(formData);

  if (hasErrors) return { errors };

  const signInData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { user, error } = await UsersService.signIn({
    email: signInData.email,
    password: signInData.password,
  });

  if (!user) return { signInError: error };

  const jwt = await encryptJwt(user);

  createSession(jwt);

  revalidatePath("/");

  redirect("/");
};
