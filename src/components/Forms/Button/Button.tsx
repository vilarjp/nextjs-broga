import { classNameMerger } from "@/utils";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = ({
  children,
  type = "submit",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNameMerger(
        "bg-slate-700 hover:bg-indigo-700 transition duration-300 rounded-lg px-4 py-2 inline max-w-max",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
