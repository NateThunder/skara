import Image from "next/image";

import HeroVideo from "./HeroVideo";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="heroMedia" aria-hidden="true">
        <HeroVideo src="/media/hero-strip-the-willow.mp4" />
      </div>

      <div className="heroScrim" aria-hidden="true" />

      <div className="heroInner">
        <SiteNav />

        <div className="heroContent container">
          <p className="eyebrow heroEyebrow">Ceilidh band · Scotland</p>
          <h1 className="heroTitle">
            <span className="srOnly"></span>
            <Image
              src="/media/logo%20white.png"
              alt=""
              width={158}
              height={65}
              priority
              sizes="(max-width: 420px) 90px, (max-width: 1080px) 22vw, 240px"
              className="heroLogo"
            />
          </h1>
          <p className="heroLead">
            High-energy ceilidh sets with a modern edge designed for packed
            dance floors.
          </p>

          <div className="heroCtas">
            <a className="btn btnPrimary" href="#bookings">
              Check availability
            </a>
            <a className="btn btnSecondary" href="#media">
              Watch highlights
            </a>
          </div>

          <div className="heroMeta">
            <span>Fiddle</span>
            <span>·</span>
            <span>Pipes</span>
            <span>·</span>
            <span>Guitar</span>
            <span>·</span>
            <span>Drums</span>
          </div>
        </div>
      </div>
    </header>
  );
}
