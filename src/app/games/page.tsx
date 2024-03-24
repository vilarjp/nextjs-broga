import Image from "next/image";
import Link from "next/link";

import { PageWrapper } from "@/components/PageWrapper";
import { Pagination } from "@/components/Pagination";
import GamesService from "@/services/games";
import { generateGameImageUrl } from "@/utils";

export default async function Games({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;
  const { data: games, metadata: pagination } = await GamesService.getGames({
    page: currentPage,
    limit,
  });

  return (
    <PageWrapper>
      <div className="container mx-auto my-6">
        <h1 className="text-3xl my-6">Games</h1>

        <div className="grid grid-cols-4 gap-x-4 gap-y-12">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex-center flex-col relative overflow-hidden"
            >
              <Link href={`/games/${game.slug}`} className="h-full w-full">
                <Image
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  src={`${generateGameImageUrl(game.image)}`}
                  alt={game.title}
                  width={600}
                  height={400}
                />
              </Link>
              <p className="pt-6 pb-2 px-2 w-full">{game.title}</p>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    </PageWrapper>
  );
}
