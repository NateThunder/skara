import Image from "next/image";

import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.layout}`}>
        <div className={`${styles.text} sectionHeader`}>
          <p className="eyebrow">About</p>
          <h2 className="h2">Traditional roots. Modern lift.</h2>
          <p className="muted">
            Skara is a four-piece ceilidh line-up blending fiddle, pipes,
            guitar and drums into a polished live sound that keeps dance floors
            moving.
          </p>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/media/bio-banner.jpg"
            alt="Skara Ceilidh Band promotional photo"
            fill
            className={styles.image}
            sizes="(max-width: 960px) 100vw, 72vw"
          />
        </div>
      </div>
    </section>
  );
}
