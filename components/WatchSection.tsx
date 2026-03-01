import Image from "next/image";

import { getYouTubeVideos } from "@/lib/youtube";

export default async function WatchSection() {
  const videos = await getYouTubeVideos({ limit: 6 });

  return (
    <section className="section" id="media">
      <div className="container">
        <div className="sectionHeader">
          <p className="eyebrow">Watch</p>
          <h2 className="h2">Latest from YouTube.</h2>
          <p className="muted">
            Recent Skara Ceilidh Band performances direct from the official
            channel.
          </p>
        </div>

        <div className="mediaGrid">
          {videos.map((video) => (
            <a
              key={video.id}
              className="mediaCard mediaCardVideo"
              href={video.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="mediaThumbWrap" aria-hidden="true">
                <Image
                  className="mediaThumb"
                  src={video.thumbnailUrl}
                  alt=""
                  fill
                  sizes="(max-width: 940px) 100vw, 33vw"
                />
              </div>
              <span className="mediaKicker">YouTube</span>
              <span className="mediaTitle">{video.title}</span>
              <span className="mediaMeta">Watch on YouTube</span>
            </a>
          ))}

          <a
            className="mediaCard"
            href="https://www.youtube.com/@skaraceilidhband2929"
            target="_blank"
            rel="noreferrer"
          >
            <span className="mediaKicker">Channel</span>
            <span className="mediaTitle">See all videos</span>
            <span className="mediaMeta">Open Skara Ceilidh Band on YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
}
