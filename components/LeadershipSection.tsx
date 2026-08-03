import Image from "next/image";
import Reveal from "@/components/Reveal";
import { team } from "@/lib/data";
import styles from "./LeadershipSection.module.css";

const leadershipIntro =
  "Từ tầm nhìn kiến trúc đến từng chi tiết nội thất, đội ngũ lãnh đạo Art Five Design dẫn dắt bằng tư duy thiết kế, chuyên môn sâu và cam kết kiến tạo giá trị bền vững cho mỗi công trình.";

export default function LeadershipSection() {
  return (
    <section
      id="team"
      className={styles.section}
      aria-labelledby="leadership-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <Reveal className={styles.headingBlock}>
            <p className={styles.eyebrow}>Lãnh đạo</p>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <h2 id="leadership-heading">
              Đội ngũ đứng sau
              <br />
              mọi dự án
            </h2>
          </Reveal>

          <Reveal delay={0.12} className={styles.introWrap}>
            <p>{leadershipIntro}</p>
          </Reveal>
        </header>

        <div className={styles.grid}>
          {team.map((member, index) => {
            const featured = index === 0;

            return (
              <Reveal
                key={member.name}
                delay={index * 0.08}
                y={22}
                className={`${styles.cardReveal} ${featured ? styles.featured : ""}`}
              >
                <article className={styles.card}>
                  {featured && (
                    <span className={styles.founderStar} aria-hidden="true">
                      ✦
                    </span>
                  )}

                  <div className={styles.portraitFrame}>
                    <Image
                      src={member.image}
                      alt={`Chân dung ${member.name}`}
                      fill
                      sizes={
                        featured
                          ? "(min-width: 1280px) 430px, (min-width: 768px) 72vw, 86vw"
                          : "(min-width: 1280px) 250px, (min-width: 768px) 40vw, 86vw"
                      }
                      className={`${styles.portraitImage} ${styles[`portrait${index}`]}`}
                    />
                  </div>

                  <div className={styles.divider} aria-hidden="true">
                    {!featured && <span>✦</span>}
                  </div>

                  <div className={styles.content}>
                    <div className={styles.nameRow}>
                      {featured && <i aria-hidden="true" />}
                      <h3>{member.name}</h3>
                      {featured && <i aria-hidden="true" />}
                    </div>
                    <p className={styles.role}>{member.role}</p>
                    <p className={styles.bio}>{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
