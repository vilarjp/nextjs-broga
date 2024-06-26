import Image from "next/image";

import {
  AwardIcon,
  GamepadIcon,
  HomeIcon,
  RouteIcon,
  UserIcon,
} from "@/components/Icons";

import { SignOutForm } from "@/modules/auth/components/SignOutForm";
import { NavbarList } from "./NavBarList";
import { NavbarListItem } from "./NavBarListItem";
import { NavbarListItemLink } from "./NavbarListItemLink";

export const Navbar = ({
  user,
}: {
  user: { name: string; email: string; id: string } | null;
}) => {
  return (
    <nav className="fixed top-0 left-0 flex h-screen flex-col bg-slate-900 border-r border-indigo-400/20 hover:border-indigo-400/40 w-72 p-2 text-slate-300 transition duration-300">
      <div className="flex items-center justify-center my-4">
        <Image
          src="https://emersonbroga.com/e/assets/emersonbroga-logo-name-pink.png"
          alt="logo"
          className="w-auto h-12 p-2"
          width={112}
          height={32}
        />
      </div>
      <NavbarList className="flex-grow">
        <NavbarListItemLink href="/">
          <HomeIcon className="w-4 h-4" />
          Home
        </NavbarListItemLink>
        <NavbarListItemLink href="/games">
          <GamepadIcon className="w-4 h-4" /> Games
        </NavbarListItemLink>
        <NavbarListItemLink href="/top-10">
          <AwardIcon className="w-4 h-4" />
          Top 10
        </NavbarListItemLink>
        <NavbarListItemLink href="/walkthroughs">
          <RouteIcon className="w-4 h-4" /> Walkthroughs
        </NavbarListItemLink>
      </NavbarList>
      <NavbarList>
        <NavbarListItemLink href={user ? "/user" : "/auth/sign-in"}>
          <UserIcon className="w-4 h-4" /> {user ? user.name : "Login"}
        </NavbarListItemLink>
        {user && (
          <NavbarListItem>
            <SignOutForm />
          </NavbarListItem>
        )}
      </NavbarList>
    </nav>
  );
};
