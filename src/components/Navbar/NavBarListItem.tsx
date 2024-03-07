import { ComponentProps } from "react";

export const NavbarListItem = ({ children }: ComponentProps<"li">) => {
  return (
    <li className="rounded-lg bg-transparent hover:bg-slate-800 transition duration-300 hover:text-fuchsia-400 cursor-pointer flex gap-2 items-center">
      {children}
    </li>
  );
};
