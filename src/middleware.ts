import { NextResponse } from "next/server";

import { refreshSession } from "@/modules/auth/utils/cookies";

export async function middleware() {
  const response = NextResponse.next();

  const updatedSession = await refreshSession();

  if (!updatedSession) return response;

  response.cookies.set(updatedSession);

  return response;
}
