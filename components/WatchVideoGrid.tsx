"use client";

import { useState } from "react";
import Image from "next/image";

import type { YouTubeVideo } from "@/lib/youtube";

type WatchVideoGridProps = {
  videos: YouTubeVideo[];
};

export default function WatchVideoGrid({ videos }: WatchVideoGridProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [loadedVideoIds, setLoadedVideoIds] = useState<Record<string, boolean>>({});

  return (
    <>
      {videos.map((video) => {
        const isActive = activeVideoId === video.videoId;
        const isLoaded = Boolean(loadedVideoIds[video.videoId]);

        return (
          <article
            key={video.id}
            className="mediaCard mediaCardVideo mediaCardVideoTube"
          >
            <div className="mediaThumbWrap mediaVideoFrame">
              {isActive ? (
                <>
                  {!isLoaded && (
                    <>
                      <Image
                        className="mediaThumb"
                        src={video.thumbnailUrl}
                        alt={`Thumbnail for ${video.title}`}
                        fill
                        sizes="(max-width: 940px) 100vw, 33vw"
                      />
                      <span className="mediaLoadingOverlay" aria-hidden="true" />
                    </>
                  )}
                  <iframe
                    className={`mediaPlayer${isLoaded ? " isReady" : ""}`}
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    onLoad={() =>
                      setLoadedVideoIds((prev) => ({ ...prev, [video.videoId]: true }))
                    }
                  />
                </>
              ) : (
                <>
                  <Image
                    className="mediaThumb"
                    src={video.thumbnailUrl}
                    alt={`Thumbnail for ${video.title}`}
                    fill
                    sizes="(max-width: 940px) 100vw, 33vw"
                  />
                  <button
                    type="button"
                    className="mediaPlayButton"
                    onClick={() => setActiveVideoId(video.videoId)}
                    aria-label={`Play ${video.title}`}
                  >
                    <span className="mediaPlayIcon" aria-hidden="true" />
                    <span>Play</span>
                  </button>
                </>
              )}
            </div>

            <span className="mediaTitle">{video.title}</span>
          </article>
        );
      })}
    </>
  );
}
