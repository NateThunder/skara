import { NextResponse } from "next/server";

import { getYouTubeVideos } from "@/lib/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const requestedLimit = Number(limitParam);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 12)
    : 6;

  try {
    const videos = await getYouTubeVideos({ limit });

    return NextResponse.json(
      {
        channelHandle:
          process.env.YOUTUBE_CHANNEL_HANDLE ?? "@skaraceilidhband2929",
        videos,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch YouTube videos",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
