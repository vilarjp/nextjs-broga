import { ComponentProps } from "react";

export const NavbarListItem = ({ children }: ComponentProps<"li">) => {
  return (
    <li className="my-2 rounded-lg bg-transparent p-2 hover:bg-slate-800 hover:text-fuchsia-400 cursor-pointer flex gap-2 items-center">
      {children}
    </li>
  );
};
