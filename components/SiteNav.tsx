"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SiteNavProps = {
  solidFrom?: number;
};

export default function SiteNav({ solidFrom = 8 }: SiteNavProps) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    function updateSolid() {
      setSolid(window.scrollY > solidFrom);
    }

    updateSolid();
    window.addEventListener("scroll", updateSolid, { passive: true });
    return () => window.removeEventListener("scroll", updateSolid);
  }, [solidFrom]);

  return (
    <div className="siteNav" data-solid={solid ? "true" : "false"}>
      <a className="brand" href="#top" aria-label="Skara Ceilidh Band">
        <Image
          src="/media/logo%20white%20lite.png"
          alt=""
          width={117}
          height={48}
          priority
          sizes="110px"
          className="brandLogo"
        />
      </a>

      <nav className="navLinks" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#media">Media</a>
        <a href="#mentions">Mentions</a>
        <a href="#bookings" className="navCta">
          Book now
        </a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
}
