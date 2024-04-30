import { PrismaClient } from "@prisma/client";
import { convert } from "url-slug";

import articles from "../../src/data/articles.json";
import games from "../../src/data/games.json";

const slugify = (url: string) =>
  convert(url, {
    dictionary: {
      "'": "",
    },
  });

const prisma = new PrismaClient();

const isDev = process.env.NODE_ENV === "development";

async function main() {
  const [, , ...args] = process.argv;
  const truncate = !!args.find((arg) => arg === "-truncate");
  const articles = !!args.find((arg) => arg === "articles");
  const games = !!args.find((arg) => arg === "games");

  if (truncate) {
    if (articles) await truncateArticles();
    if (games) await truncateGamesAndGenres();
  }

  if (articles) await seedArticles();
  if (games) await seedGamesAndGenres();
}

async function seedArticles() {
  if (!isDev) throw new Error("Seeding is only allowed in development mode");

  for (const article of articles) {
    await prisma.article.create({
      data: {
        title: article.title,
        slug: slugify(article.title),
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        publishedAt: new Date(article.publish_date),
      },
    });
  }
}

async function truncateArticles() {
  if (!isDev) throw new Error("Truncating is only allowed in development mode");

  await prisma.article.deleteMany();
  await prisma.$executeRawUnsafe(
    "DELETE FROM SQLITE_SEQUENCE WHERE name=$1;",
    "Article"
  );
}

async function seedGamesAndGenres() {
  if (!isDev) throw new Error("Truncating is only allowed in development mode");

  try {
    for (let game of games) {
      const genres = game.genre.map((title) => {
        const slug = slugify(title);
        return {
          genre: {
            connectOrCreate: {
              where: { slug },
              create: { title, slug },
            },
          },
        };
      });

      const record = await prisma.game.create({
        data: {
          title: game.title,
          slug: game.slug,
          year: game.year,
          image: game.fileName,
          link: game.link || "#",
          platform: "Nintendo 64",
          genres: {
            create: genres,
          },
        },
      });

      console.log("*** created game", record.id, record.title);
    }
  } catch (error) {
    console.log(error);
  }
}

async function truncateGamesAndGenres() {
  if (!isDev) throw new Error("Truncating is only allowed in development mode");

  await prisma.gameGenre.deleteMany();
  await prisma.game.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.$executeRawUnsafe(
    "DELETE FROM SQLITE_SEQUENCE WHERE name=$1;",
    "GameGenre"
  );
  await prisma.$executeRawUnsafe(
    "DELETE FROM SQLITE_SEQUENCE WHERE name=$1;",
    "Games"
  );
  await prisma.$executeRawUnsafe(
    "DELETE FROM SQLITE_SEQUENCE WHERE name=$1;",
    "Genres"
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
