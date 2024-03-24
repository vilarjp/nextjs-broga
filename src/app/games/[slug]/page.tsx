import Image from "next/image";

import { PageWrapper } from "@/components/PageWrapper";
import GamesService from "@/services/games";
import { generateGameImageUrl } from "@/utils";

export default async function GamePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const game = await GamesService.getGameBySlug(slug);

  if (!game) return null;

  return (
    <PageWrapper>
      <div className="container mx-auto my-6">
        <div className="w-2/3">
          <h1 className="text-3xl my-6">{game.title}</h1>
          <Image
            className="my-6 h-full w-full object-cover rounded-lg"
            src={generateGameImageUrl(game.image)}
            alt={game.title}
            width={600}
            height={400}
          />
          <div className="my-6 flex flex-col">
            <p className="my-2 p-2 bg-slate-700 rounded">
              {game.platform} - {game.year}
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
