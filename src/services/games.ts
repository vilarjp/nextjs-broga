import Game from "@/libs/database/games";

export default {
  getGames: async ({ page = 1, limit = 10 } = {}) => {
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
};
