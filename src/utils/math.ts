export const getIntArray = (max: number) => {
  return Array.from({ length: max - 1 + 1 }, (_, i) => i + 1);
};
