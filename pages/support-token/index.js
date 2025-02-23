import Head from "next/head";
import styles from "./ReserveToken.module.css";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../components/Context";
export default function ReserveToken() {
	 const [loadImage, setLoadImage] = useState(true);
	 const { setAvailableModal, loginModal,
    setLoginModal, } = useContext(DataContext);
   	function NotAvailableModal() {
    	setAvailableModal(true);
  	}
	useEffect(() => {
    setTimeout(() => setLoadImage(false), 1000);
  }, []);
	
	
	  function openModal() {
    setLoginModal(1);
  }
	
	
  return (
    <>
<Head>
  <title>{"Ozacoin (OZA) - Le jeton utilitaire Ozalentour"}</title>
  <meta name="description" content="Ozacoin est un actif numérique corrélé à notre solution Ozalentour et adossé sur 3 cryptos-actifs tels que : BTC, BNB et ETH. Stockable etéchangeable par des applications tierces."/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="keywords" content="Ozacoin, OZA, Jeton de soutien, Jeton de réservce, Crypto, Token de soutien, Token de réserve"/>
  <meta property="og:url" content="https://fr.ozalentour.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Ozacoin (OZA) - Le Jeton de soutien" />
  <meta property="og:description" content="Ozacoin est un actif numérique corrélé à notre solution Ozalentour et adossé sur 3 cryptos-actifs tels que : BTC, BNB et ETH. Stockable etéchangeable par des applications tierces." />
  <meta property="og:site_name" content="Ozalentour®" />
  <meta property="og:image" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta property="og:image:secure_url" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:alt" content="Le Jeton de soutien" />
  <meta property="fb:app_id" content="2500591266698535" />
  <meta property="article:publisher" content="https://www.facebook.com/Ozalentourfr/" />
  <meta name="twitter:site" content="@ozalentour"/>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Ozacoin (OZA) - Le Jeton de soutien" />
  <meta name="twitter:description" content="Ozacoin est un actif numérique corrélé à notre solution Ozalentour et adossé sur 3 cryptos-actifs tels que : BTC, BNB et ETH. Stockable etéchangeable par des applications tierces." />
  <meta name="twitter:image" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta name="twitter:image:alt" content="Le Jeton de soutien"/>
  <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>

      {/* {loginModal === 0 ? ( */}
      <div className={styles.pressAreaContainer}>
        <div className={styles.banner}>
          
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"Ozacoin (OZA) - Le Jeton Utilitaire"}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"OZACOIN (OZA) par Ozalentour®"}
            </p>
          </div>
        </div>
        <div className={styles.siteContent}>
            <div className={styles.featuresInner}>
                <div className={styles.container}>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                   <img src="liberty-token.png" alt="jeton libre et décentralisé"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                          
                        </div>
                        <div className={styles.featuresInfo}>
                        <h3><span>{"Devenez possésseur d'un jeton libre"}</span>{" et unique !"}</h3>
								<p>{"Disponible sur la blockchain de Binance (réseau BEP20), Ozacoin a pour mission d'offrir un actif numérique corrélé à notre solution Ozalentour tout en étant adossé sur 3 cryptos telles que : BTC, BNB et ETH. Stockable et échangeable via des applications tierces, OZACOIN a pour vocation d'être convertissable sur différents marchés régulés. Heureux détenteur d'un portefeuille Ozacoin ? Utilisez votre portefeuille OZA pour recharger votre compte Ozalentour à moindre frais et rattachez votre clé publique afin de suivre vos investissements !"}</p><br/>
						<a onClick={openModal} className={styles.pointerLink} /*target="_blank" href="https://www.pinksale.finance/"*/ class="Participer à l'ICO" title="Devenir membre Ozacoin">Rejoindre Ozalentour</a>
                        </div>
                    </div>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                <img src="transaction-crypto.png" alt="Transfert d'argent en cryptomonnaie"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                           
                    </div>
                        <div className={styles.featuresInfo}>
                            <h3>{"Des transactions à moindre frais, sécurisées et"}<span>{" ultrarapides !"}</span></h3>
							<p>{"Disponible sur des applications tierces comme Token Pocket, MathWallet et bientôt TrustWallet, Ozacoin est avant tout un actif numérique échangeable de gré à gré, sans banque ni état, via la blockchain BSC (Binance Smart Chain). Une bien belle solution répondant aux besoins du moment ! Fonctionnant à moindre frais avec vos BNB (crypto de Binance), profitez d'un système économique libre, transparent et sécurisé de pair à pair ! "}</p><br/>
                            <a target="_blank" href="https://accounts.binance.com/register?ref=BW2ISB63" class="more" title="Acheter des cryptos de Binance">Acheter des BNB</a>
                        </div>
                    </div>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                <img src="jeton-garanti.png" alt="Token garanti"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                          
                        </div>
                        <div className={styles.featuresInfo}>
                            <h3>{"Un jeton garanti "}<span>{"sans détention via Ozalentour !"}</span> </h3>
							<p>{"Tout comme LEDGER, notre 'Utility Token' Ozacoin a pour but de vous mettre à disposition un actif numérique intégralement sous votre propre contrôle et sans risque de détention par notre plateforme. Profitez ainsi d'un jeton utilitaire vous permettant de rester libre économiquement via notre super application Ozalentour, mais aussi notre partenaire MathWallet !"}</p>	
							<br/>
                            <a target="_blank" href="https://mathwallet.org/fr-fr/" class="more" title="Ouvrir un portefeuille Ozacoin">Télécharger MathWallet</a>
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