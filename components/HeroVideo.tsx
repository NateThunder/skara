"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
};

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    setIsPlaying(!video.paused);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 0.9;
    setMuted(nextMuted);

    if (video.paused) void video.play().catch(() => {});
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
  }

  return (
    <div className="heroVideo">
      <video
        ref={videoRef}
        className="heroVideoEl"
        src={src}
        poster={poster}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label="Skara Ceilidh Band performance video"
      />

      <button
        type="button"
        className="btn btnPrimary playToggle"
        onClick={togglePlayback}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <span className="playToggleLabel">{isPlaying ? "Pause" : "Play"}</span>
      </button>

      <button
        type="button"
        className="btn btnPrimary muteToggle"
        onClick={toggleMute}
        aria-pressed={!muted}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        <svg
          className="muteToggleIcon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H3v6h3l5 4V5z" />
          {muted ? (
            <>
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
        <span className="muteToggleLabel">{muted ? "Sound off" : "Sound on"}</span>
      </button>
    </div>
  );
}
