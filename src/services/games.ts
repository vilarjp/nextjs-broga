import Game from "@/libs/database/games";
import { generateRandomIntArrayInRange, sleep } from "@/utils";

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
    const ids = generateRandomIntArrayInRange(total, limit);
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
