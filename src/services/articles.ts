import Article from "@/libs/database/articles";
import { sleep } from "@/utils/sleep";

const HIGHLIGHT_ARTICLES_COUNT = 4;

export default {
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
    await sleep();

    const data = await Article.get({
      limit: HIGHLIGHT_ARTICLES_COUNT,
    });

    return data;
  },
  getArticleBySlug: async (slug: string) => {
    const data = await Article.getOne({ where: { slug } });

    return data;
  },
};
