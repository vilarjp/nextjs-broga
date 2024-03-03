import {
  AwardIcon,
  GamepadIcon,
  HomeIcon,
  RouteIcon,
  UserIcon,
} from "@/components/Icons";

export const Navbar = () => {
  return (
    <nav className="flex h-screen flex-col gap-4 bg-slate-900 border-r border-indigo-400/40 hover:border-indigo-400/80 w-72 p-2 text-slate-300">
      <div>
        <img
          src="https://emersonbroga.com/e/assets/emersonbroga-logo-name-pink.png"
          alt="logo"
          className="max-w-full p-2"
        />
      </div>
      <ul className="my-4 flex-grow border-t border-indigo-400/20 hover:border-indigo-400/40">
        <li className="my-2 rounded-lg bg-transparent p-2 hover:bg-slate-800 hover:text-indigo-500 cursor-pointer flex gap-2 items-center">
          <HomeIcon className="w-4 h-4" />
          Home
        </li>
        <li className="my-2 rounded-lg bg-transparent p-2 hover:bg-slate-800 hover:text-indigo-500 cursor-pointer flex gap-2 items-center">
          <GamepadIcon className="w-4 h-4" /> Games
        </li>
        <li className="my-2 rounded-lg bg-transparent p-2 hover:bg-slate-800 hover:text-indigo-500 cursor-pointer flex gap-2 items-center">
          <AwardIcon className="w-4 h-4" />
          Top 10
        </li>
        <li className="my-2 rounded-lg bg-transparent p-2 hover:bg-slate-800 hover:text-indigo-500 cursor-pointer flex gap-2 items-center">
          <RouteIcon className="w-4 h-4" /> Walkthroughs
        </li>
      </ul>
      <ul className="my-4 border-t border-indigo-400/20 hover:border-indigo-400/40">
        <li className="my-2 rounded-lg bg-transparent p-2 hover:bg-slate-800 hover:text-indigo-500 cursor-pointer flex gap-2 items-center">
          <UserIcon className="w-4 h-4" /> User
        </li>
      </ul>
    </nav>
  );
};
