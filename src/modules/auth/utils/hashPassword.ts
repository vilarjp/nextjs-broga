import bcrypt from "bcrypt";

export const createHash = async (password: string) => {
  try {
    if (!password) return null;

    const hash = await bcrypt.hash(password, 12);

    return hash;
  } catch (error) {
    return null;
  }
};

export const verifyHash = async (password: string, hash: string) => {
  try {
    if (!password || !hash) return false;

    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
};
