export const generateIntArray = (max: number) => {
  return Array.from({ length: max - 1 + 1 }, (_, i) => i + 1);
};

export const generateRandomIntArrayInRange = (max: number, count: number) => {
  // Fisher-Yates shuffle
  const array = generateIntArray(max);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, count);
};
