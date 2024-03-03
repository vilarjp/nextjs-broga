import Link from "next/link";

import { ComponentProps } from "react";
import { NavbarListItem } from "./NavbarListItem";

export const NavbarListItemLink = ({
  href,
  children,
}: ComponentProps<typeof Link>) => {
  return (
    <NavbarListItem className="p-0">
      <Link
        href={href}
        className="flex gap-2 items-center p-2 w-full rounded-lg"
      >
        {children}
      </Link>
    </NavbarListItem>
  );
};
