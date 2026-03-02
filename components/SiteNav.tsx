"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";

const NAV_COLLAPSE_WIDTH = 1100;
const NAV_BLUR_START = 8;
const NAV_BLUR_RANGE = 320;

function getScrollContainer(): HTMLElement {
  // If your app uses a custom scroll wrapper, mark it with this attribute.
  const custom = document.querySelector<HTMLElement>("[data-scroll-container='true']");
  if (custom) {
    return custom;
  }

  const html = document.documentElement;
  const body = document.body;
  const htmlOverflowY = window.getComputedStyle(html).overflowY;
  const bodyOverflowY = window.getComputedStyle(body).overflowY;
  const bodyScrolls =
    /(auto|scroll|overlay)/.test(bodyOverflowY) && body.scrollHeight > body.clientHeight;
  const htmlLocked = /(hidden|clip)/.test(htmlOverflowY);

  // Safari/iOS setups often lock html and scroll body.
  if (bodyScrolls && htmlLocked) {
    return body;
  }

  return (document.scrollingElement as HTMLElement) ?? document.documentElement;
}

function getScrollTop(scrollEl: HTMLElement) {
  const isDocScroller =
    scrollEl === document.documentElement ||
    scrollEl === document.body ||
    scrollEl === document.scrollingElement;

  if (isDocScroller) {
    return Math.max(
      window.scrollY || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0,
      scrollEl.scrollTop || 0,
      0,
    );
  }

  return Math.max(scrollEl.scrollTop || 0, 0);
}

export default function SiteNav() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollTargetRef = useRef<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    let frameId = 0;

    const updateFrost = () => {
      frameId = 0;

      const scrollEl = getScrollContainer();
      const y = getScrollTop(scrollEl);
      const normalized = (y - NAV_BLUR_START) / NAV_BLUR_RANGE;
      const progress = Math.min(Math.max(normalized, 0), 1);
      const blur = 30 * progress;
      const alpha = 0.34 * progress;
      const shadow = 0.28 * progress;

      nav.style.setProperty("--nav-blur", `${blur.toFixed(2)}px`);
      nav.style.setProperty("--nav-bg-alpha", alpha.toFixed(3));
      nav.style.setProperty("--nav-shadow-alpha", shadow.toFixed(3));
      const scrollbarWidth = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
      nav.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      document.documentElement.style.setProperty("--header-height", `${nav.offsetHeight}px`);
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateFrost);
    };

    updateFrost();

    const scrollEl = getScrollContainer();
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

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
    if (!menuOpen || window.innerWidth > NAV_COLLAPSE_WIDTH) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const scrollEl = getScrollContainer();
    const scrollY = getScrollTop(scrollEl);

    const isCustomContainer =
      scrollEl !== document.documentElement &&
      scrollEl !== document.body &&
      scrollEl !== document.scrollingElement;

    if (isCustomContainer) {
      const previousOverflow = scrollEl.style.overflow;
      scrollEl.style.overflow = "hidden";

      return () => {
        const shouldRestoreScroll = pendingScrollTargetRef.current === null;
        scrollEl.style.overflow = previousOverflow;
        if (shouldRestoreScroll) {
          scrollEl.scrollTop = scrollY;
        }
      };
    }

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      const top = body.style.top;
      const shouldRestoreScroll = pendingScrollTargetRef.current === null;

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      html.style.overflow = "";

      if (shouldRestoreScroll) {
        const y = top ? -parseInt(top, 10) : scrollY;
        window.scrollTo(0, y);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen || pendingScrollTargetRef.current === null) {
      return;
    }

    const targetSelector = pendingScrollTargetRef.current;
    pendingScrollTargetRef.current = null;

    const target = document.querySelector(targetSelector);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    const shouldDeferScroll = menuOpen && window.innerWidth <= NAV_COLLAPSE_WIDTH;
    if (shouldDeferScroll) {
      pendingScrollTargetRef.current = href;
      closeMenu();
    } else {
      closeMenu();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.history.pushState(null, "", href);
  };

  return (
    <div
      ref={navRef}
      className="siteNav"
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
