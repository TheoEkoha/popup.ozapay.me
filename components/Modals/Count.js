import styles from "./Count.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { setCookies, getCookie, getCookies } from "cookies-next";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiMedium,
  SiTelegram,
  SiTwitter,
} from "react-icons/si";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import axios from "axios";
import { min } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { useTranslation } from "react-i18next";


export default function Count() {
  const { setAvailableModal, setShowCountModal, loginModal, setLoginModal } =
    useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  const [changeLink, setChangeLink] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);

  function NotAvailableModal() {
    setAvailableModal(true);
  }
  function closeModal() {
    setShowModal(false);
    setShowCountModal(false);
  }

  function onCross() {
    setShowModal(false);
    setShowCountModal(false);
  }

  const { t, i18n } = useTranslation("fr", { useSuspense: false });
  useEffect(() => {
    setTimeout(setShowModal(true), 5000);
    const target = new Date("01/31/2024 17:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSecondes(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const currentLanguage = i18n.language;
    console.log(currentLanguage);
    if (currentLanguage === "en") {
      console.log("hello");
      setChangeLink(true);
    }
  }, [i18n.language]);
  return (
    <>
      <div className={showModal ? styles.ousiteCount : styles.modalHidden}>
        <div className={showModal ? styles.modalCount : styles.modalHidden}>
          <div className={styles.test}></div>
          <div className={styles.containerCross}>
            <HiX className={styles.closeModal} onClick={onCross} />
          </div>
          <nav className={styles.verticalSocial}>
            <ul>
              <li>
                <a target="_blank" href="https://t.me/Ozalentour">
                  <SiTelegram />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/Ozalentourfr/"
                >
                  <SiFacebook />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/ozalentour/mycompany/verification/"
                >
                  <SiLinkedin />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.instagram.com/ozalentour/">
                  <SiInstagram />
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.container}>
            <div className={styles.ozalentourlogo}>
              <a
                title="Logo Ozalentour"
                href="https://fr.ozalentour.com"
                className={styles.sitebrandlogo}
              >
                <img src="ozaLogo.png" alt="Ozalentour" />
              </a>
            </div>

            <div className={styles.containerBox}>
              <div className={styles.leftBox}>
                <h1 className={styles.animated}>{t("invest2")}</h1>
                <h3>{t("softCaphardCap")}</h3>
                <div className={styles.containerGauge}>
                  <ul className={styles.progressTop}>
                    <li>
                      <p></p>
                    </li>
                    <li>
                      {t("privateSales")}
                      <p>|</p>
                    </li>
                    <li>
                      {t("softCap")}
                      <p>|</p>
                    </li>
                    <li>
                      {t("equity")}
                      <p>|</p>
                    </li>
                    <li>
                      {t("ieo")}
                      <p>|</p>
                    </li>
                  </ul>
                  <div className={styles.progress}>
                    <div
                      className={
                        styles["progress-bar"] +
                        " " +
                        styles["progress-bar-custom"]
                      }
                      /* style="width: 65%;" */ aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  {/*  <div className={styles.progressBottom}>
                
                <div className={styles.progressInfo}>10 millions OZA</div>
                <div className={styles.progressInfo}>11 millions OZA</div>
                <div>1 OZA = €0.01</div>
            </div> */}
                </div>

                <div
                  className={styles["clock-counter"] + " " + styles["animated"]}
                  data-animation="fadeInUpShorter"
                  data-animation-delay="2.1s"
                >
                  <div
                    className={
                      styles["clock"] + " " + styles["flip-clock-wrapper"]
                    }
                  >
                    <span className={styles["flip-clock-divider"]}>
                      <span className={styles.flipClockLabelSecond}></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["top"]
                        }
                      ></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["bottom"]
                        }
                      ></span>
                    </span>
                    <ul className={styles.flip}>
                      <span>{t("days")}</span>
                      <li class="flip-clock-before">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                        </a>
                      </li>
                      <li class="flip-clock-active">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                            {days}
                          </div>
                        </a>
                      </li>
                    </ul>

                    <span className={styles["flip-clock-divider"]}>
                      <span className={styles.flipClockLabelSecond}></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["top"]
                        }
                      ></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["bottom"]
                        }
                      ></span>
                    </span>
                    <ul className={styles.flip}>
                      <span>{t("hours")}</span>
                      <li class="flip-clock-before">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                        </a>
                      </li>
                      <li class="flip-clock-active">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                            {hours}
                          </div>
                        </a>
                      </li>
                    </ul>

                    <span className={styles["flip-clock-divider"]}>
                      <span className={styles.flipClockLabelThird}></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["top"]
                        }
                      ></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["bottom"]
                        }
                      ></span>
                    </span>
                    <ul className={styles.flip}>
                      <span>{t("minutes")}</span>
                      <li class="flip-clock-before">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                        </a>
                      </li>
                      <li class="flip-clock-active">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                            {minutes}
                          </div>
                        </a>
                      </li>
                    </ul>

                    <span className={styles["flip-clock-divider"]}>
                      <span className={styles.flipClockLabelFour}></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["top"]
                        }
                      ></span>
                      <span
                        className={
                          styles["flip-clock-dot"] + " " + styles["bottom"]
                        }
                      ></span>
                    </span>
                    <ul className={styles.flip}>
                      <span>{t("seconds")}</span>
                      <li class="flip-clock-before">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                        </a>
                      </li>
                      <li class="flip-clock-active">
                        <a href="#">
                          <div class="up">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                          </div>
                          <div class="down">
                            <div class="shadow"></div>
                            <div class="inn"></div>
                            {secondes}
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.btns}>
                  <a href="https://pancakeswap.finance/swap?inputCurrency=0x1E16D4579D6a1471745a20eC491739e201971151&outputCurrency=0x55d398326f99059fF775485246999027B3197955">
                    {t("participate")}
                  </a>
                </div>
                <p className={styles.bottomText}>
                  {t("downloadWP")}
                  <a
                    target="_blank"
                    href={
                      changeLink
                        ? "/pdf/white_paper_ozalentour_en.pdf"
                        : "/pdf/white_paper_ozalentour_fr.pdf"
                    }
                  >
                    {t("here")}
                  </a>
                </p>
              </div>
              <div className={styles.rightBox}>
                <div className={styles.logoWrapper}>
                  <div className={styles.cryptoLogo}>
                    <div className={styles.ripple}></div>
                    <div className={styles.ripple2}></div>
                    <div className={styles.ripple3}></div>
                    <img
                      className={styles["ozacoin"] + " " + styles["pulse2"]}
                      src="OZA.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              styles["bgRippleAnimation"] +
              " " +
              styles["hidden"] +
              " " +
              styles["block"]
            }
          >
            <div className={styles.leftBottomRipples}>
              <div className={styles.ripples}></div>
            </div>
            <div className={styles.topRightRipples}>
              <div className={styles.ripples}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
