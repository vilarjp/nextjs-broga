import { GAMES_BASE_URL } from "@/modules/games/constants";

export const gameImageUrlMapper = (image: string) =>
  `${GAMES_BASE_URL}/${image}`;
