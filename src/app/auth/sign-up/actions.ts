"use server";

import UsersService from "@/services/users";
import { User } from "@prisma/client";

export type SignUpFormData = {
  errors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  } | null;
  createdUser: User | null;
};

const validateSignUpForm = (formData: FormData) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (email && !email.includes("@")) errors.email = "Invalid email";
    if (!password) errors.password = "Password is required";
    if (password && password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    if (!confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  } catch (error) {
    return {
      name: "Invalid form data",
      email: "Invalid form data",
      password: "Invalid form data",
      confirmPassword: "Invalid form data",
    };
  }
};

export const handleSignUpForm = async (
  prevState: any,
  formData: FormData
): Promise<SignUpFormData> => {
  try {
    const errors = validateSignUpForm(formData);

    if (Object.values(errors).some((error) => error))
      return {
        ...prevState,
        errors,
        createdUser: null,
      };

    const newUser = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const createdUser = await UsersService.signUp(newUser);

    return {
      ...prevState,
      errors: null,
      createdUser,
    };
  } catch (error) {
    return {
      ...prevState,
      errors: {
        name: "Error creating user",
        email: "Error creating user",
        password: "Error creating user",
        confirmPassword: "Error creating user",
      },
      createdUser: null,
    };
  }
};
