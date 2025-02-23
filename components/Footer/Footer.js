import styles from "./Footer.module.css";
import Link from "next/link";
import { SiFacebook } from "react-icons/si";
import { SiTwitter } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { SiInstagram } from "react-icons/si";
import { SiYoutube } from "react-icons/si";
import { SiDiscord } from "react-icons/si";


import { useContext, useState, useEffect } from "react";
import { DataContext } from "../Context";
import Count from "../Modals/Count/Count";
import { useTranslation } from "react-i18next";

export default function Footer({ children }) {
  const {
    availableModal,
    setAvailableModal,
    showCountModal,
    setShowCountModal,
  } = useContext(DataContext);
  const [changeLink, setChangeLink] = useState(false);
  const { t, i18n } = useTranslation("fr", { useSuspense: false });

  function openModalCount() {
    console.log("hello");

    setShowCountModal(true);
    console.log(showCountModal);
  }

  function NotAvailableModal() {
    setAvailableModal(true);
  }
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
      {children}
      {showCountModal ? <Count /> : null}

      <div id="footer" className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.testfooter}>
            <div className={styles.footerColumn}>
              <img
                className={styles.ozaLogo}
                src="/ozaLogo.png"
                alt="Ozapay logo"
              />
              <span>
                <br />
                <Link href="/support-token">{t("tokenOza")}</Link>
                <br />
              </span>
              <div className={styles.storeButtons}>
                <a onClick={openModalCount} title="Acheter des OZA">
                  <img src="investir-sur-ozacoin.png" alt="Acheter des OZA" />
                </a>
              </div>
            </div>
            <div className={styles.footerColumn}>
              <h4>{t("importantLinks")}</h4>
              <ul>
                <li>
                  <Link href="/">{t("presentationOffer")}</Link>
                </li>
                <li>
                  <Link href="/explication">{t("explicationVideo")}</Link>
                </li>
                <li>
                  <Link href="/team">{t("teamOza")}</Link>
                </li>
                <li>
                  <Link href="/pressArea">{t("pressArea")}</Link>
                </li>

                <li>
                  <Link
                    target="_blank"
                    href={
                      changeLink
                        ? "/pdf/white_paper_ozalentour_en.pdf"
                        : "/pdf/white_paper_ozalentour_fr.pdf"
                    }
                  >
                    {t("whitepaper")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>{t("LearnMore")}</h4>
              <li>
                <Link href="/ecosysteme">{t("whyApp")}</Link>
              </li>
              <li>
                <Link target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeumD8MsupSPBXtgETojCC0_xMxokAZNqyp5qORp0M9MdyL2Q/viewform" passHref >Migrer mes OZA vers Solana</Link>
              </li>
              <li>
                <Link href="/subscription-prices">{t("TarifSubsc")}</Link>
              </li>
              <li>
                <Link href="/become-ambassador">{t("BecomeAmbassad")}</Link>
              </li>
              <li>
                <Link href="/faq">{t("faq")}</Link>
              </li>
            </div>
            <div className={styles.footerColumn}>
              <h4>{"Contact"}</h4>
              <Link target="_blank" href={
                      changeLink
                        ? "https://t.me/OzaPay_officiel"
                        : "https://t.me/OzaPay_officiel"
                    }>
                <img
                  className={styles.footerTelegram}
                  src="/telegram.png"
                  alt="telegram"
                />
              </Link>
              <div className={styles.footerSpecial}>
                <div className={styles["social"] + " " + styles["facebook"]}>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/Ozapay/"
                  >
                    <SiFacebook />
                  </a>
                </div>
                <div className={styles["social"] + " " + styles["twitter"]}>
                  <a target="_blank" href="https://www.linkedin.com/company/ozapay/">
                    <SiTwitter />
                  </a>
                </div>
                <div className={styles["social"] + " " + styles["linkedin"]}>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/ozapay/"
                  >
                    <SiLinkedin />
                  </a>
                </div>
                <div className={styles["social"] + " " + styles["instagram"]}>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/ozapay/"
                  >
                    <SiInstagram />
                  </a>
                </div>
                <div className={styles["social"] + " " + styles["youtube"]}>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@Ozapay"
                  >
                    <SiYoutube />
                  </a>
                </div>
              </div>
              <div className={styles.mailContact}>
                <Link href="/contact">{t("contact")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.legalDocuments}>
        <p>
          {t("legalDocs")}
          <Link href="/pdf/cgu-ozalentour.pdf">{t("termsService")}</Link>-
          <Link href="/pdf/cgv-ozalentour.pdf">{t("termsSales")}</Link>-
          <Link href="/pdf/mentions-legales.pdf">{t("legalNotice")}</Link>-
          <Link href="/pdf/politiques-de-confidentialite.pdf">
            {t("privacyPolicies")}
          </Link>
          -<Link href="/sitemap">{t("sitemap")}</Link>
        </p>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          <p>&copy; {t("rightsReserved")}</p>
        </div>
      </div>
    </>
  );
}
