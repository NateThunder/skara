"use client";

import { useState } from "react";
import Image from "next/image";

import type { YouTubeVideo } from "@/lib/youtube";

type WatchVideoGridProps = {
  videos: YouTubeVideo[];
};

export default function WatchVideoGrid({ videos }: WatchVideoGridProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const formatDate = (publishedAt: string) => {
    if (!publishedAt) {
      return "YouTube";
    }

    const date = new Date(publishedAt);

    if (Number.isNaN(date.getTime())) {
      return "YouTube";
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {videos.map((video) => {
        const isActive = activeVideoId === video.videoId;

        return (
          <article
            key={video.id}
            className={`mediaCard mediaCardVideo mediaCardVideoTube${isActive ? " isExpanded" : ""}`}
          >
            <div className="mediaThumbWrap mediaVideoFrame">
              {isActive ? (
                <>
                  <iframe
                    className="mediaPlayer"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    className="mediaCloseButton"
                    onClick={() => setActiveVideoId(null)}
                    aria-label={`Close ${video.title}`}
                  >
                    Close
                  </button>
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
            <span className="mediaMeta">
              Skara Ceilidh Band | {formatDate(video.publishedAt)}
            </span>

            <a href={video.url} target="_blank" rel="noreferrer" className="mediaLink">
              Watch on YouTube
            </a>
          </article>
        );
      })}
    </>
  );
}
