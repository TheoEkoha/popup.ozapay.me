import Head from "next/head";
import styles from "./PaymentToken.module.css";

import { useContext, useState, useEffect } from "react";
export default function PaymentToken() {
	  const [loadImage, setLoadImage] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoadImage(false), 1000);
  }, []);
  return (
    <>
<Head>
  <title>{"Présentation du Compte Ozalentour (IBAN, CB...)"}</title>
  <meta name="description" content="Ouvrez votre compte social sans banque sur Ozalentour, Payez sans contact et Profitez des meilleures fonctionnalités pour suivre et faire fructifier votre argent !"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="keywords" content="Ouvrez votre compte social sans banque sur Ozalentour, Payez sans contact et Profitez des meilleures fonctionnalités pour suivre et faire fructifier votre argent !"/>
  <meta property="og:url" content="https://fr.ozalentour.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Présentation du Compte Ozalentour (IBAN, CB...)" />
  <meta property="og:description" content="Ouvrez votre compte social sans banque sur Ozalentour, Payez sans contact et Profitez des meilleures fonctionnalités pour suivre et faire fructifier votre argent !" />
  <meta property="og:site_name" content="Ozalentour®" />
  <meta property="og:image" content="https://fr.ozalentour.com/public/ozaphyre.jpg"/>
  <meta property="og:image:secure_url" content="https://fr.ozalentour.com/public/ozaphyre.jpg"/>
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:alt" content="Présentation du Portemonnaie" />
  <meta property="fb:app_id" content="2500591266698535" />
  <meta property="article:publisher" content="https://www.facebook.com/Ozalentourfr/" />
  <meta name="twitter:site" content="@ozalentour"/>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Ozalentour - Présentation du Portemonnaie" />
  <meta name="twitter:description" content="Ouvrez votre compte social sans banque sur Ozalentour, Payez sans contact et Profitez des meilleures fonctionnalités pour suivre et faire fructifier votre argent !" />
  <meta name="twitter:image" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta name="twitter:image:alt" content="Présentation du Portemonnaie"/>
  <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>  

      {/* {loginModal === 0 ? ( */}
      <div className={styles.pressAreaContainer}>
        <div className={styles.banner}>
          
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"Présentation du Portemonnaie"}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"Un compte social sans banque, simple et sécurisé"}
            </p>
          </div>
        </div>
        <div className={styles.siteContent}>
            <div className={styles.featuresInner}>
                <div className={styles.container}>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                   <img src="cartes_cadeaux_cryptos_euros.png" alt="carte cadeau crypto"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                          
                        </div>
                        <div className={styles.featuresInfo}>
                            <h3><span>{"Un Portemonnaie rechargeable "}</span>{" selon vos besoins !"}</h3>
							<p>{"Rattachez votre CB et/ou utilisez vos cryptomonnaies pour recharger votre compte social Ozalentour. Choisissez le montant que vous souhaitez ajouter à votre solde et utilisez facilement votre argent auprès de la communauté et chez l'ensemble de vos commerçants !"}</p>
                        </div>
                    </div>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                     <img src="tpe_compatible_crypto.png" alt="Boitier de paiement compatible crypto"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                    </div>
                        <div className={styles.featuresInfo}>
                            <h3><span>{"Un système de paiement"}</span>{" compatible avec les cryptomonnaies !"}</h3>
							<p>{"Profitez d'un système d'encaissement facilitant les paiements en toutes devises. Principalement une passerelle de paiement respectueuse des états souverains, Ozalentour permets de choisir votre devise préférée avant tout paiement. Ex : Via votre portefeuille crypto OZA, rechargez votre compte Ozalentour et payez en instantanné !"}</p>
                        </div>
                    </div>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							{loadImage === false ? (
                    <img src="envoi_rapide_de_fonds.png" alt="Envoyer rapidement de l'argent"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                          
                        </div>
                        <div className={styles.featuresInfo}>
                            <h3><span>{"Des transactions rapide et sans frais"}</span>{" pour toute notre communauté !"}</h3>
						    <p>{"Depuis votre compte Ozalentour, envoyez facilement de l'argent à vos amis et relations en quelques secondes seulement. Un paiement à effectuer ? Touchez le TPE ou le téléphone du commerçant, puis confirmez votre paiement !"}</p>
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