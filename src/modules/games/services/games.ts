import Game from "@/database/games";
import { generateRandomArray } from "@/utils/generateArrays";
import { sleep } from "@/utils/sleep";

const gamesService = {
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
    const ids = generateRandomArray(total, limit);
    const where = { id: { in: ids } };
    const data = await Game.get({ where, limit });

    return data;
  },
  getGameBySlug: async (slug: string) => {
    await sleep();

    const data = await Game.getOne({ where: { slug } });

    return data;
  },
};

export default gamesService;
