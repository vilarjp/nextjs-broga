/*
  Warnings:

  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Games_slug_key";

-- DropIndex
DROP INDEX "Genres_slug_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Games";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Genres";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameGenre" (
    "gameId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("gameId", "genreId"),
    CONSTRAINT "GameGenre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameGenre" ("gameId", "genreId") SELECT "gameId", "genreId" FROM "GameGenre";
DROP TABLE "GameGenre";
ALTER TABLE "new_GameGenre" RENAME TO "GameGenre";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");
