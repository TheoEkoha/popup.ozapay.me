import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../components/Context";
import crisp from "../components/crisp";
import { useRouter } from "next/router";
import { getCookie, setCookies } from "cookies-next";
import Rgpd from "../components/Modals/RGPD/Rgpd";

export default function Home() {
  const router = useRouter()
  const { setLoginModal, setIsFromLandingPage, setIsOpenReset, rgpd } = useContext(DataContext);
  const [rgpdCookie, setRGPDCookie] = useState(false);
  const [loadImage, setLoadImage] = useState(true);

  const handleOpenModal = (e) => {
    if (router.query.reset) {
      setIsOpenReset(true)
    }
    e.preventDefault();
    setLoginModal(1);
    setIsFromLandingPage(true)
  };
  useEffect(() => {
    if (router.query.reset) {
      setIsOpenReset(true)
      setLoginModal(1);
    }
  }, [router.query])

  useEffect(() => {
    const getRGPD = async () => {
      let checkRGPD = await getCookie("CookieRgpd");
      checkRGPD ? setRGPDCookie(true) : null;
    };

    setTimeout(() => setLoadImage(false), 1000);
    getRGPD();

    
  }, [rgpd]);

  return (
    <div>
      <Head>
      <title>
        Ozapay - Une Super App, un Compte et des Cryptos sous votre propre
        détention !
      </title>
  <meta
    name="description"
    content="Pré-Ouvrez votre super compte Ozapay, soyez parmi les premiers à posséder notre Super App et Gagnez de l'argent tout simplement !"
  />
  <meta
    name="keywords"
    lang="fr"
    content="Ozapay, super app de paiement, app de paiement multiservices, néo-banque, compte euro-crypto"
  />
  <meta name="author" content="Ozapay SAS" />
  <meta name="category" content="Fintech" />
  <meta name="robots" content="index" />
  <meta name="distribution" content="global" />
  <meta name="revisit-after" content="15 day" />
  <meta name="copyright" content="OZAPAY SAS" />
  {/* OpenGraph Metadata */}
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="Ozapay - Une Super App, un Compte et des Cryptos sous votre propre détention !"
  />
  <meta
    property="og:description"
    content="Pré-Ouvrez votre compte Ozapay, restez informé et tentez de gagner jusqu'à 2000€ de cryptomonnaies sous votre propre et unique détention ! Inscription gratuite et participation au concours sans obligation d'achat."
  />
  <meta property="og:site_name" content="Ozapay" />
  <meta property="og:url" content="https://fr.ozapay.me/index.html" />
  <meta
    property="og:image"
    content="https://fr.ozapay.me/public/hotlink-ok/banner-new.jpg"
  />
  <meta property="og:image:alt" content="La Super App de Paiement" />
  <link rel="shortcut icon" href="/public/favicon.ico" />

      {/* Add title if not set elsewhere */}

        <link rel="shortcut icon" href="/public/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css?family=Oxygen:400,300,700"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="alternate" hrefLang="fr" href="https://fr.ozapay.me"/>
        <link rel="alternate" hrefLang="en" href="https://en.ozapay.me" />
        <link rel="alternate" href="https://www.ozapay.me/" hrefLang="x-default"/>
        {/* <script src="https://kit.fontawesome.com/9db655d324.js" async></script> */}
 
      </Head>
             {!rgpdCookie ? <Rgpd /> 
              : null}
      <Script src="https://static.elfsight.com/platform/platform.js" async></Script>
      <Script
        id="matomo-script"
        strategy="afterInteractive"
      >
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//analytics.ozapay.me/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
      <Script src="https://kit.fontawesome.com/9db655d324.js" async></Script>
      <div className="progress progress-striped active slideInLeft animated animated-delay">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow="65"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "70%" }}
        >
          <span>70 % Terminé</span>
        </div>
      </div>
      <div className="animation-container">
        <div className="clouds"></div>
      </div>

      <div className="container container-second">
        <header className="row top-header">
          <div className="col-md-12">
            <div className="containerLogo">
              <Image
                className="logo"
                src="/img/newLogo.png"
                alt="Logo"
                width={240}
                height={66}
              />
            </div>
            <h1 color="white" style={{color: 'white!important'}}className="text-center bounceInDown animated">
              Rejoignez la Révolution Ozapay !
            </h1>
            <p className="row text-center bounceInUp animated discover">
              <b>Une Super App</b>, <b>un Compte</b> et des{" "}
              <b>cryptos</b><br /> <b>sous votre propre détention</b> !
            </p>
          </div>
        </header>

        <div
          className="buttonBuyContainer"
          id="buttonBuy"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <Link href="#" passHref>
            <a
              onClick={(e) => handleOpenModal(e)}
              style={{
                margin: "0",
              }}
              className="ButtonWhitepaper"
            >
              Pré-ouvrir mon compte
            </a>
          </Link>
          <Link
            href="https://solsale.app/presale/all"
            passHref
          >
            <a
              style={{
                lineHeight: "1.8",
                fontSize: "14px",
                padding: "0.4rem 1.85rem",
                height: "auto"
              }}
              className="ButtonAirDrop"
              target="_blank"
            >
              Acheter des OZA
            </a>
          </Link>
        </div>

        <div className="migrateContainer">
          <Link href="/pdf/whitepaper_fr_2024.pdf" passHref>
            <a
              style={{ marginBottom: "1.5rem", fontSize: "16px" }}
              className="migrate"
              target="_blank"
            >
              Voir le Livre Blanc
            </a>
          </Link>
        </div>

        <section className="row text-center social bounceInUp animated">
          <div className="col-md-12">
            <ul className="social-icons">
              <li>
                <Link href="https://www.facebook.com/ozapay/">
                  <a target="_blank">
                    <i
                      className="fa-brands fa-square-facebook fa-2x"
                      style={{ fontSize: "35px" }}
                    ></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/OzaPay_officiel" passHref>
                  <a target="_blank">
                    <i
                      className="fa-brands fa-square-x-twitter"
                      style={{ fontSize: "35px" }}
                    ></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://t.me/ozapay_official" passHref>
                  <a target="_blank">
                    <i
                      className="fa-brands fa-telegram"
                      style={{ fontSize: "35px" }}
                    ></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/ozapay" passHref>
                  <a target="_blank">
                    <i
                      className="fa-brands fa-linkedin"
                      style={{ fontSize: "35px" }}
                    ></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/ozapay" passHref>
                  <a target="_blank">
                    <i
                      className="fa-brands fa-square-instagram"
                      style={{ fontSize: "35px" }}
                    ></i>
                  </a>
                </Link>
              </li>
            </ul>
			<p style={{ fontSize: "14px" }}>CA 67iVSrbgQKiPjttU9uXx9CXUoS1Si3XUhrXeiNAUUZSR</p>
          </div>
        </section>
        <div className="elfsight-app-99cf8e87-e8d3-47f8-9066-3e6545998e8f" data-elfsight-app-lazy></div>
      </div>
    </div>
  );
}
