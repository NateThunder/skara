"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useState } from "react";

type SiteNavProps = {
  solidFrom?: number;
};

const NAV_COLLAPSE_WIDTH = 1100;

export default function SiteNav({ solidFrom = 8 }: SiteNavProps) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function updateSolid() {
      setSolid(window.scrollY > solidFrom);
    }

    updateSolid();
    window.addEventListener("scroll", updateSolid, { passive: true });
    return () => window.removeEventListener("scroll", updateSolid);
  }, [solidFrom]);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    function onResize() {
      if (window.innerWidth > NAV_COLLAPSE_WIDTH) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeydown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= NAV_COLLAPSE_WIDTH) {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      closeMenu();
      return;
    }

    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
  };

  return (
    <div
      className="siteNav"
      data-solid={solid ? "true" : "false"}
      data-open={menuOpen ? "true" : "false"}
    >
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

      <button
        type="button"
        className="navToggle"
        aria-expanded={menuOpen}
        aria-controls="site-nav-links"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="navLinks" id="site-nav-links" aria-label="Primary navigation">
        <a href="#about" onClick={handleNavClick}>
          About
        </a>
        <a href="#media" onClick={handleNavClick}>
          Media
        </a>
        <a href="#mentions" onClick={handleNavClick}>
          Mentions
        </a>
        <a href="#bookings" className="navCta" onClick={handleNavClick}>
          Book now
        </a>
        <a href="#contact" onClick={handleNavClick}>
          Contact
        </a>
      </nav>

      <button
        type="button"
        className="navBackdrop"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </div>
  );
}
