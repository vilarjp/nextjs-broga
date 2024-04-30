"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import zod, { ZodError } from "zod";

import UsersService from "@/modules/auth/services/users";
import { createSession } from "@/modules/auth/utils/cookies";
import { encryptJwt } from "@/modules/auth/utils/jwt";

type ValidationErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormData = {
  errors?: ValidationErrors;
  signUpError?: string;
};

export type SignUpFormProps = {
  handleSignUpForm: (
    _: SignUpFormData,
    formData: FormData
  ) => Promise<SignUpFormData>;
};

type ValidateSignUpForm = {
  hasErrors: boolean;
  errors?: ValidationErrors;
};

const userSchema = zod
  .object({
    name: zod.string().min(3, "Name must be at least 3 characters long"),
    email: zod.string().email(),
    password: zod
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: zod
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.name.trim().split(" ").length >= 2, {
    message: "Last name is required",
    path: ["name"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const validateSignUpForm = (formData: FormData): ValidateSignUpForm => {
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
        name: "Unknown error, please check your data and try again",
        email: "Unknown error, please check your data and try again",
        password: "Unknown error, please check your data and try again",
        confirmPassword: "Unknown error, please check your data and try again",
      },
    };
  }
};

export const handleSignUpForm = async (
  _: SignUpFormData,
  formData: FormData
): Promise<SignUpFormData> => {
  const { hasErrors, errors } = validateSignUpForm(formData);

  if (hasErrors)
    return {
      errors,
    };

  const newUser = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { user, error } = await UsersService.signUp(newUser);

  if (!user) return { signUpError: error };

  const jwt = await encryptJwt(user);

  createSession(jwt);

  revalidatePath("/");

  redirect("/");
};
