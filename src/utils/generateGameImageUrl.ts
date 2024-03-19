const BASE_URL =
  "https://raw.githubusercontent.com/emersonbroga/nintendo-64-games/main/images";

export const generateGameImageUrl = (image: string) => `${BASE_URL}/${image}`;
