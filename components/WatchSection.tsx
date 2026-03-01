import { getYouTubeVideos } from "@/lib/youtube";
import WatchVideoGrid from "@/components/WatchVideoGrid";

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
          <WatchVideoGrid videos={videos} />
        </div>
      </div>
    </section>
  );
}
