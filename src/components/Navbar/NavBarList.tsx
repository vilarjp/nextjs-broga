import { ReactNode } from "react";

export const NavbarList = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <ul
      className={`my-4 border-t border-indigo-400/20 hover:border-indigo-400/40 ${className}`}
    >
      {children}
    </ul>
  );
};
