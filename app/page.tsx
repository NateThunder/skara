import type { ReactNode } from "react";

import AboutSection from "@/components/AboutSection";
import BookingsWidget from "@/components/BookingsWidget";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import WatchSection from "@/components/WatchSection";
import availability from "@/data/availability.json";
import { BENEFITS, FOOTER_LINKS, MENTIONS } from "@/data/homeContent";

const SEAM_DIVIDER_CLASS =
  "pointer-events-none absolute top-0 left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 px-2";

function SectionWithDivider({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <SectionDivider count={2} mobileCount={1} className={SEAM_DIVIDER_CLASS} />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <main className="main">
        <AboutSection />

        <SectionWithDivider>
          <section className="section sectionAlt" id="benefits">
            <div className="container">
              <div className="sectionHeader">
                <p className="eyebrow">Why Skara</p>
                <h2 className="h2">A premium, modern ceilidh experience.</h2>
                <p className="muted">
                  Built for momentum: smooth flow, strong dynamics, and a clear
                  plan from enquiry to encore.
                </p>
              </div>

              <div className="cards">
                {BENEFITS.map((item) => (
                  <article key={item.title} className="card">
                    <h3 className="h3">{item.title}</h3>
                    <p className="muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </SectionWithDivider>

        <SectionWithDivider>
          <WatchSection />
        </SectionWithDivider>

        <SectionWithDivider>
          <section className="section sectionAlt" id="mentions">
            <div className="container">
              <div className="sectionHeader">
                <p className="eyebrow">Mentions</p>
                <h2 className="h2">What people say.</h2>
                <p className="muted">
                  Public write-ups and event listings mentioning Skara.
                </p>
              </div>

              <div className="quotes">
                {MENTIONS.map((item) => (
                  <figure key={item.href} className="quote">
                    <blockquote>{item.quote}</blockquote>
                    <figcaption>
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </SectionWithDivider>

        <SectionWithDivider>
          <section className="section" id="bookings">
            <div className="container">
              <div className="sectionHeader">
                <p className="eyebrow">Bookings</p>
                <h2 className="h2">Check availability.</h2>
                <p className="muted">
                  Select a date, tell us the basics, and we will confirm what is
                  available.
                </p>
              </div>

              <BookingsWidget availability={availability} />
            </div>
          </section>
        </SectionWithDivider>
      </main>

      <footer className="footer" id="contact">
        <div className="container footerInner">
          <div className="footerLeft">
            <p className="eyebrow">Contact</p>
            <p className="footerTitle">Skara Ceilidh Band</p>
            <p className="muted">
              For bookings and enquiries, email{" "}
              <a className="textLink" href="mailto:info@skaraceilidh.com">
                info@skaraceilidh.com
              </a>
              .
            </p>
          </div>

          <div className="footerRight" aria-label="Links">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                className="footerLink"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
