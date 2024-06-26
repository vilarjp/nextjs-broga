import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

import { gameImageUrlMapper } from "@/modules/games/utils/image-url-mapper";

type Games = {
  games: Array<{
    id: number;
    slug: string;
    title: string;
    year: number;
    image: string;
    link: string;
    platform: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
};

const ScrollableGames = ({ games }: Games) => {
  return (
    <>
      {games.map((game) => (
        <Link
          href={`/games/${game.slug}`}
          key={game.id}
          className="h-32 w-auto"
        >
          <Image
            className="h-full w-full object-cover brightness-75 hover:brightness-100 transition-all duration-300 ease-in-out"
            src={gameImageUrlMapper(game.image)}
            alt={game.title}
            width={372}
            height={272}
          />
        </Link>
      ))}
    </>
  );
};

export const Hero = ({ games }: Games) => {
  const style = {
    "--duration": "180s",
    "--item-size": "128px",
    "--item-count": "10",
  } as CSSProperties;

  return (
    <div className="container mx-auto my-6 h-[35vh] flex-center gap-2">
      <div className="flex-center">
        <div className="flex-center flex-col">
          <Image
            src="/assets/images/nintendo-64-logo.png"
            alt="Nintendo 64 logo"
            width={160}
            height={150}
          />
          <h1 className="text-4xl my-6">The Best Nintendo 64 Fan Website</h1>
        </div>
      </div>

      <div
        className="ml-auto w-auto h-full border border-slate-700 p-2 rounded-lg"
        style={style}
      >
        <div className="flex h-full overflow-hidden gap-2">
          <div className="scroll-ttb flex flex-col gap-2 ">
            <ScrollableGames games={games.slice(0, 10)} />
            <ScrollableGames games={games.slice(0, 10)} />
          </div>
          <div className="scroll-btt flex flex-col gap-2 ">
            <ScrollableGames games={games.slice(10, 20)} />
            <ScrollableGames games={games.slice(10, 20)} />
          </div>
          <div className="scroll-ttb flex flex-col gap-2 ">
            <ScrollableGames games={games.slice(20, 30)} />
            <ScrollableGames games={games.slice(20, 30)} />
          </div>
          <div className="scroll-btt flex flex-col gap-2 ">
            <ScrollableGames games={games.slice(30, 40)} />
            <ScrollableGames games={games.slice(30, 40)} />
          </div>
        </div>
      </div>
    </div>
  );
};
