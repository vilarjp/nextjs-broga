import { decryptJwt, encryptJwt } from "@/modules/auth/utils/jwt";
import { cookies } from "next/headers";

const ONE_HOUR = 60 * 60 * 1000;

const generateExpires = () => new Date(Date.now() + ONE_HOUR);

export const createSession = (jwt: string) =>
  cookies().set("session", jwt, {
    expires: generateExpires(),
    httpOnly: true,
  });

export const getSession = async () => {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  const user = await decryptJwt(session);

  return {
    email: user.email as string,
    name: user.name as string,
    id: user.role as string,
  };
};

export const deleteSession = () => cookies().delete("session");

export const refreshSession = async () => {
  const session = await getSession();

  if (!session) return null;

  const jwt = await encryptJwt(session);

  const updatedSession = {
    name: "session",
    value: jwt,
    expires: generateExpires(),
    httpOnly: true,
  };

  return updatedSession;
};
