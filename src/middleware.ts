import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const userId = req.cookies.get("userId");

  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/",
    "/create-post",
    "/activity",
    "/@:username/media",
    "/@:username/likes",
    "/@:username/following",
    "/@:username/followers",
    "/@:username/edit",
    "/@:username/settings",
  ],
};
