import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(
  "47fc0f0556e13dacff6eb64e2df3d2dee2fd156a95ce0cfde1b3f7dddfddd8d7"
);

export const encryptJwt = async (payload: Record<string, string>) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);

export const decryptJwt = async (jwtToken: string) => {
  const { payload } = await jwtVerify(jwtToken, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
};
