import Game from "@/libs/database/games";
import { sleep } from "@/utils/sleep";

export default {
  getGames: async ({ page = 1, limit = 10 } = {}) => {
    await sleep();

    const offset = (page - 1) * limit;
    const data = await Game.get({ offset, limit });
    const total = await Game.count({});
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      metadata: {
        currentPage: page,
        limit,
        offset,
        total,
        totalPages,
      },
    };
  },
  getRandomGames: async ({ limit = 10 } = {}) => {
    const total = await Game.count({});
    const offset = Math.max(0, Math.floor(Math.random() * total) - limit);
    const data = await Game.get({ limit, offset });
    const sorted = data.sort(() => (Math.random() > 0.5 ? 1 : -1));

    return sorted;
  },
  getGameBySlug: async (slug: string) => {
    await sleep();

    const data = await Game.getOne({ where: { slug } });

    return data;
  },
};
