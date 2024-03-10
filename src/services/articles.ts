import Article from "@/libs/database/articles";

const HIGHLIGHT_ARTICLES_COUNT = 4;

export default {
  getArticles: async ({ page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    const data = await Article.get({ offset, limit });
    const total = await Article.count({});

    return {
      data,
      metadata: {
        page,
        limit,
        offset,
        total,
      },
    };
  },
  getHomeArticles: async ({ page = 1, limit = 10 } = {}) => {
    const offset = (page - 1) * limit + HIGHLIGHT_ARTICLES_COUNT;

    const data = await Article.get({
      offset,
      limit,
    });
    const total = await Article.count({});
    const totalPages = Math.ceil((total - HIGHLIGHT_ARTICLES_COUNT) / limit);

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
  getHighlightArticles: async () => {
    const data = await Article.get({
      limit: HIGHLIGHT_ARTICLES_COUNT,
    });

    return {
      data,
    };
  },
};
