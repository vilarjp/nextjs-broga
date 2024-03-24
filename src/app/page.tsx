import Image from "next/image";

import { Hero } from "@/components/Hero";
import { PageWrapper } from "@/components/PageWrapper";
import { Pagination } from "@/components/Pagination";
import ArticlesService from "@/services/articles";
import GamesService from "@/services/games";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const { data: articles, metadata: pagination } =
    await ArticlesService.getHomeArticles({
      page: currentPage,
      limit,
    });
  const { data: highlights } = await ArticlesService.getHighlightArticles();
  const { data: randomGames } = await GamesService.getRandomGames({
    limit: 40,
  });

  return (
    <PageWrapper>
      <Hero games={randomGames} />

      <div className="container mx-auto my-10">
        <h2 className="text-3xl my-6 underline">Latest Articles</h2>

        <div className="grid grid-cols-4 gap-4 h-[42vh]">
          {highlights.splice(-4).map((article) => (
            <div
              key={article.id}
              className="flex-center relative overflow-hidden"
            >
              <div className="h-full w-full">
                <Image
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  src={`/assets/images/articles/${article.image}`}
                  alt={article.title}
                  width={600}
                  height={400}
                />
              </div>
              <p className="absolute bottom-0 pt-6 pb-2 px-2 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent w-full">
                {article.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto my-10">
        <h3 className="text-3xl my-6 underline">Articles</h3>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="flex flex-col gap-4">
              {articles.map((article) => (
                <div
                  className="flex bg-slate-800 rounded-md py-4"
                  key={article.id}
                >
                  <div className="flex items-center">
                    <div className="h-40 rounded-r-lg overflow-hidden">
                      <Image
                        className="h-full w-full object-cover transition duration-500 hover:scale-105 rounded-r-lg"
                        src={`/assets/images/articles/${article.image}`}
                        alt={article.title}
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2 pl-4">
                    <h2 className="text-3xl mb-4 text-indigo-400">
                      {article.title}
                    </h2>
                    <p className="flex-grow">{article.excerpt}</p>
                    <button className="bg-slate-700 hover:bg-indigo-700 transition duration-300 rounded-lg px-4 py-2 inline max-w-max">
                      Ler mais
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
          <div className="col-span-4 bg-emerald-500">B</div>
        </div>
      </div>
    </PageWrapper>
  );
}
