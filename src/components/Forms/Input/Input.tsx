import { classNameMerger } from "@/utils/classNameMerger";
import { ComponentProps } from "react";

type InputProps = {
  label?: string;
  error?: string;
} & ComponentProps<"input">;

export const Input = ({
  label,
  name,
  type = "text",
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={classNameMerger("my-4", className)}>
      {label && (
        <label htmlFor={name} className="text-slate-300 my-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        className={classNameMerger(
          "w-full rounded-md border-2 border-transparent bg-slate-800 px-4 py-3 text-base text-slate-200 focus:outline-none focus:ring-0",
          {
            "border-red-500": !!error,
          }
        )}
        {...props}
      />
      {error && <small className="text-sm text-red-500 my-2">{error}</small>}
    </div>
  );
};
