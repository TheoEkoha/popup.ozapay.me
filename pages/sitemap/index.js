import { DataContext } from "../../components/Context";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styles from "./Sitemap.module.css";
import { useTranslation } from "react-i18next";

export default function Sitemap() {
  const {
    availableModal,
    setAvailableModal,
    showCountModal,
    setShowCountModal,
  } = useContext(DataContext);
  const { t } = useTranslation("fr", { useSuspense: false });

  function openModalCount() {
    console.log("hello");

    setShowCountModal(true);
    console.log(showCountModal);
  }
  return (
    <>
      {showCountModal ? <Count /> : null}

      <div className={styles.siteContent}>
        <ul>
          <h3>Liens utiles</h3>
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
        </ul>
        <ul>
          <h3>En savoir +</h3>
          <li>
            <Link href="/ecosysteme">{t("whyApp")}</Link>
          </li>
          <li>
            <Link href="/payment-currency">{t("accountPresentation")}</Link>
          </li>
          <li>
            <a onClick={openModalCount}>{t("TarifSubsc")}</a>
          </li>
          <li>
            <Link href="/become-ambassador">{t("BecomeAmbassad")}</Link>
          </li>
          <li>
            <Link href="/faq">{t("faq")}</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
