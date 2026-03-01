import AboutSection from "@/components/AboutSection";
import BookingsWidget from "@/components/BookingsWidget";
import Hero from "@/components/Hero";
import ThistleMotif from "@/components/ThistleMotif";
import WatchSection from "@/components/WatchSection";
import availability from "@/data/availability.json";

export default function Home() {
  return (
    <>
      <Hero />

      <main className="main">
        <AboutSection />

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
              <article className="card">
                <h3 className="h3">Dancefloor energy</h3>
                <p className="muted">
                  Lively sets that keep people moving — from first circle to
                  last chorus.
                </p>
              </article>
              <article className="card">
                <h3 className="h3">Crisp sound, any room</h3>
                <p className="muted">
                  A clean mix and confident delivery that fits both intimate
                  spaces and big venues.
                </p>
              </article>
              <article className="card">
                <h3 className="h3">Easy to book</h3>
                <p className="muted">
                  Check availability, share your details, and we’ll confirm the
                  plan quickly.
                </p>
              </article>
            </div>
          </div>
        </section>

        <WatchSection />

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
              <figure className="quote">
                <blockquote>
                  “Kept them up and dancing for hours!”
                </blockquote>
                <figcaption>
                  <a
                    href="https://www.siobhanamyphotography.com/christina-iain-glenapp-castle-wedding/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Siobhan Amy Photography
                  </a>
                </figcaption>
              </figure>
              <figure className="quote">
                <blockquote>“A really good ceilidh dance band.”</blockquote>
                <figcaption>
                  <a
                    href="https://www.cluarantonn.com/scottish-digest/campbeltown/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cluarantonn (Scottish Digest)
                  </a>
                </figcaption>
              </figure>
              <figure className="quote">
                <blockquote>
                  “Live ceilidh music … to keep you dancing all night.”
                </blockquote>
                <figcaption>
                  <a
                    href="https://www.perth-races.co.uk/fixture-Hogmanay-Hoolie-2025-id274"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Perth Racecourse (Hogmanay Hoolie)
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section" id="bookings">
          <div className="container">
            <div className="sectionHeader">
              <p className="eyebrow">Bookings</p>
              <h2 className="h2">Check availability.</h2>
              <p className="muted">
                Select a date, tell us the basics, and we’ll confirm what’s
                available.
              </p>
            </div>

            <BookingsWidget availability={availability} />
          </div>

          <ThistleMotif className="motif motifBookings" />
        </section>
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
            <a
              className="footerLink"
              href="https://www.facebook.com/skaraceilidhband/?locale=en_GB"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              className="footerLink"
              href="https://www.youtube.com/@skaraceilidhband2929"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
            <a className="footerLink" href="#top">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
