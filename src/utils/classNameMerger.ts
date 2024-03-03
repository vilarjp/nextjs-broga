import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const classNameMerger = (...classes: Array<ClassValue>) =>
  twMerge(clsx(...classes));
