import Head from "next/head";
import styles from "./Team.module.css";

import { useContext, useState, useEffect } from "react";

export default function Team() {
  const [loadImage, setLoadImage] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoadImage(false), 1000);
  }, []);
  return (
    <>
      <Head>
        <title>{"Ozalentour - L'équipe Ozalentour"}</title>
        <meta
          name="description"
          content="Découvrez l'équipe Ozalentour et contactez-nous"
        />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="keywords" content="équipe Ozalentour, team Ozalentour," />
        <meta property="og:url" content="https://fr.ozalentour.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="La Team Fondatrice - Ozalentour" />
        <meta
          property="og:description"
          content="Découvrez l'équipe type Ozalentour maintenant !"
        />
        <meta property="og:site_name" content="Ozalentour®" />
        <meta
          property="og:image"
          content="https://fr.ozalentour.com/public/ozacoin.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://fr.ozalentour.com/public/ozacoin.jpg"
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:alt" content="La Team Ozalentour" />
        <meta property="fb:app_id" content="2500591266698535" />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/Ozalentourfr/"
        />
        <meta name="twitter:site" content="@ozalentour" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="a Team Fondatrice - Ozalentour" />
        <meta
          name="twitter:description"
          content="Découvrez l'équipe type Ozalentour maintenant !"
        />
        <meta
          name="twitter:image"
          content="https://fr.ozalentour.com/public/ozacoin.jpg"
        />
        <meta name="twitter:image:alt" content="La Team Ozalentour" />
        <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>

      {/* {loginModal === 0 ? ( */}
      <div className={styles.explicationContainer}>
        <div className={styles.bannerTeam}>
          <div className={styles.container}>
            <div className={styles.pageTitleContent}>
              <h1 className={styles.pageTitleContent.h1}>
                {"L'Equipe Ozalentour"}
              </h1>
              <p className={styles.pageTitleContent.p}>
                {"Présentation de l'entreprise"}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.siteContent}>
          <div className={styles.containerTeam}>
            <div className={styles.companyInfo}>
              {loadImage === false ? (
                <img src="about-2.jpg" alt="mission" />
              ) : (
                <div className={styles.containerLoader}>
                  <div className={styles.loader} />
                </div>
              )}

              <div className={styles.ciContent}>
                <span className={styles.explanationCard}>Ozalentour SAS</span>
                <h2>Notre Mission</h2>
                <p>
                  Localisé sur Lille (59), l’objectif d'Ozalentour SAS est
                  d’apporter une super application tout-en-un. Pour y arriver,
                  retrouvez sur Ozalentour un compte sans banque, des bons plans
                  ainsi qu'un réseau social innovant. Envie de sortir, de
                  voyager ou encore de consommer bio et proximité ? Depuis
                  l'explorateur, profitez de nos offres de cashback publiées par
                  la communauté !
                </p>
              </div>
            </div>

            <div className={styles.theTeam}>
              <h2>Présentation de la Team</h2>
              <div className={styles["otContent"] + " " + styles["otContent5"]}>
                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"] +
                    " " +
                    styles["mobileOrderx4"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/johan-decottignies/"
                      target="_blank"
                    >
                      <img src="jdeco.jpg" />
                      <div className={styles.test}>
                        <h3>Johan Decottignies</h3>
                        <span class="job">Président - CEO</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/arnaud-ratte-b0882881/"
                      target="_blank"
                    >
                      <img src="arnaudr.jpg" />

                      <div className={styles.test}>
                        <h3>Arnaud Ratte</h3>
                        <span class="job">Chef des opérations</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/francois-gary-83327196/"
                      target="_blank"
                    >
                      <img src="fgary.jpg" />
                      <div className={styles.test}>
                        <h3>Francois Gary</h3>
                        <span class="job">Chef des Finances</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/adrien-andreetta-33279111b/"
                      target="_blank"
                    >
                      <img src="adriena.jpg" />

                      <div className={styles.test}>
                        <h3>Adrien Andreeta</h3>
                        <span class="job">Chef des ventes - CCO</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/vincent-wertz-807b38192/"
                      target="_blank"
                    >
                      <img src="vincentwertz.jpg" />

                      <div className={styles.test}>
                        <h3>Vincent Wertz</h3>
                        <span class="job">Responsable RH</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles["otContent"] + " " + styles["otContent4"]}>
                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"] +
                    " " +
                    styles["mobileOrderx3"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/juliette-bray-223b31192/"
                      target="_blank"
                    >
                      <img src="jbray.jpg" />
                      <div className={styles.test}>
                        <h3>Juliette Bray</h3>
                        <span class="job">Assistante Marketing</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div className={styles.hoverBoxThumb}>
                    <a
                      href="https://www.linkedin.com/in/lou-duquenoy-0b68a3168/"
                      target="_blank"
                    >
                      <img src="lduquenoy.jpg" />
                      <div className={styles.test}>
                        <h3>Lou Duquenoy</h3>
                        <span class="job">Développeur Full Stack</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div
                    className={
                      styles["hoverBoxThumb"] +
                      " " +
                      styles["hoverBoxThumbHidden"]
                    }
                  >
                    <a
                      href="https://www.linkedin.com/in/francois-gary-83327196/"
                      target="_blank"
                    >
                      <img src="fgary.jpg" />
                      <div className={styles.test}>
                        <h3>Francois Gary</h3>
                        <span class="job">Chief Technical Officer</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div
                    className={
                      styles["hoverBoxThumb"] +
                      " " +
                      styles["hoverBoxThumbHidden"]
                    }
                  >
                    <a
                      href="https://www.linkedin.com/in/francois-gary-83327196/"
                      target="_blank"
                    >
                      <img src="fgary.jpg" />
                      <div className={styles.test}>
                        <h3>Francois Gary</h3>
                        <span class="job">Chief Technical Officer</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    styles["otItem"] +
                    " " +
                    styles["gridItem"] +
                    " " +
                    styles["hoverBox"]
                  }
                >
                  <div
                    className={
                      styles["hoverBoxThumb"] +
                      " " +
                      styles["hoverBoxThumbHidden"]
                    }
                  >
                    <a
                      href="https://www.linkedin.com/in/francois-gary-83327196/"
                      target="_blank"
                    >
                      <img src="fgary.jpg" />
                      <div className={styles.test}>
                        <h3>Francois Gary</h3>
                        <span class="job">Chief Technical Officer</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <LoginModal />
      )} */}
    </>
  );
}
