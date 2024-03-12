/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Game_slug_key";

-- DropIndex
DROP INDEX "Genre_slug_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Game";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Genre";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Games" (
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
    CONSTRAINT "GameGenre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameGenre" ("gameId", "genreId") SELECT "gameId", "genreId" FROM "GameGenre";
DROP TABLE "GameGenre";
ALTER TABLE "new_GameGenre" RENAME TO "GameGenre";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Genres_slug_key" ON "Genres"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Games_slug_key" ON "Games"("slug");
