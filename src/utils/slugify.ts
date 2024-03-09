import { convert } from "url-slug";

export const slugify = (url: string) => {
  return convert(url, {
    dictionary: {
      "'": "",
    },
  });
};
