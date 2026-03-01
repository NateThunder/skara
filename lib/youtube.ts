export type YouTubeVideo = {
  id: string;
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
};

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const DEFAULT_CHANNEL_HANDLE = "skaraceilidhband2929";
const DEFAULT_VIDEO_LIMIT = 6;
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "fallback-strip-the-willow",
    videoId: "JqlLWTigJG0",
    title: "Strip the Willow (highlight)",
    url: "https://www.youtube.com/watch?v=JqlLWTigJG0",
    thumbnailUrl: "https://i.ytimg.com/vi/JqlLWTigJG0/hqdefault.jpg",
    publishedAt: "",
  },
];

function getFallbackVideos(limit: number): YouTubeVideo[] {
  return FALLBACK_VIDEOS.slice(0, Math.max(1, limit));
}

function getThumbnailUrl(snippet: {
  thumbnails?: {
    maxres?: { url?: string };
    standard?: { url?: string };
    high?: { url?: string };
    medium?: { url?: string };
    default?: { url?: string };
  };
}): string {
  return (
    snippet.thumbnails?.maxres?.url ??
    snippet.thumbnails?.standard?.url ??
    snippet.thumbnails?.high?.url ??
    snippet.thumbnails?.medium?.url ??
    snippet.thumbnails?.default?.url ??
    ""
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`YouTube API request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

type ChannelsResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type PlaylistItemsResponse = {
  items?: Array<{
    id?: string;
    contentDetails?: {
      videoId?: string;
      videoPublishedAt?: string;
    };
    snippet?: {
      title?: string;
      publishedAt?: string;
      resourceId?: {
        videoId?: string;
      };
      thumbnails?: {
        maxres?: { url?: string };
        standard?: { url?: string };
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
  }>;
};

export async function getYouTubeVideos(options?: {
  limit?: number;
  channelHandle?: string;
}): Promise<YouTubeVideo[]> {
  const limit = options?.limit ?? DEFAULT_VIDEO_LIMIT;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return getFallbackVideos(limit);
  }

  const channelHandle =
    options?.channelHandle ??
    process.env.YOUTUBE_CHANNEL_HANDLE ??
    DEFAULT_CHANNEL_HANDLE;

  try {
    const channelParams = new URLSearchParams({
      part: "contentDetails",
      key: apiKey,
      forHandle: channelHandle.replace(/^@/, ""),
    });

    const channelData = await fetchJson<ChannelsResponse>(
      `${YOUTUBE_API_BASE}/channels?${channelParams.toString()}`
    );

    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error("Unable to resolve uploads playlist for this channel handle");
    }

    const playlistParams = new URLSearchParams({
      part: "snippet,contentDetails",
      key: apiKey,
      playlistId: uploadsPlaylistId,
      maxResults: String(limit),
    });

    const playlistData = await fetchJson<PlaylistItemsResponse>(
      `${YOUTUBE_API_BASE}/playlistItems?${playlistParams.toString()}`
    );

    return (
      playlistData.items
        ?.map((item) => {
          const videoId =
            item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;

          if (!videoId) {
            return null;
          }

          return {
            id: item.id ?? videoId,
            videoId,
            title: item.snippet?.title ?? "YouTube video",
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnailUrl:
              getThumbnailUrl(item.snippet ?? {}) ||
              `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            publishedAt:
              item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? "",
          } satisfies YouTubeVideo;
        })
        .filter((video): video is YouTubeVideo => video !== null) ?? []
    );
  } catch (error) {
    console.error(
      "YouTube fetch failed, serving fallback videos instead.",
      error instanceof Error ? error.message : error
    );
    return getFallbackVideos(limit);
  }
}
