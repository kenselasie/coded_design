import { toLlmsTxt } from "codeddesign/agent";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/html")) {
    return NextResponse.redirect(new URL("/llms", request.url), 307);
  }

  return new Response(toLlmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
