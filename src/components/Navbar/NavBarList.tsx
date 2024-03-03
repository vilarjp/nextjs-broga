import { ComponentProps } from "react";

import { classNameMerger } from "@/utils";

export const NavbarList = ({
  children,
  className = "",
}: ComponentProps<"ul">) => {
  return (
    <ul
      className={classNameMerger(
        "my-4 border-t border-indigo-400/20 hover:border-indigo-400/40",
        className
      )}
    >
      {children}
    </ul>
  );
};
