import {
  AwardIcon,
  GamepadIcon,
  HomeIcon,
  RouteIcon,
  UserIcon,
} from "@/components/Icons";

import { NavbarList } from "./NavbarList";
import { NavbarListItem } from "./NavbarListItem";

export const Navbar = () => {
  return (
    <nav className="flex h-screen flex-col bg-slate-900 border-r border-indigo-400/20 hover:border-indigo-400/40 w-72 p-2 text-slate-300">
      <div className="flex items-center justify-center my-4">
        <img
          src="https://emersonbroga.com/e/assets/emersonbroga-logo-name-pink.png"
          alt="logo"
          className="w-auto h-12 p-2"
        />
      </div>
      <NavbarList className="flex-grow">
        <NavbarListItem>
          <HomeIcon className="w-4 h-4" />
          Home
        </NavbarListItem>
        <NavbarListItem>
          <GamepadIcon className="w-4 h-4" /> Games
        </NavbarListItem>
        <NavbarListItem>
          <AwardIcon className="w-4 h-4" />
          Top 10
        </NavbarListItem>
        <NavbarListItem>
          <RouteIcon className="w-4 h-4" /> Walkthroughs
        </NavbarListItem>
      </NavbarList>
      <NavbarList>
        <NavbarListItem>
          <UserIcon className="w-4 h-4" /> User
        </NavbarListItem>
      </NavbarList>
    </nav>
  );
};
