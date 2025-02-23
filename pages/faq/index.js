import Head from "next/head";
import styles from "./Faq.module.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { set } from "react-hook-form";
export default function Faq() {
  const [showText, setShowText] = useState(0);
 
  return (
    <>
<Head>
  <title>{"Ozalentour.com - Foire aux Questions (FAQ)"}</title>
  <meta name="description" content="Ozalentour c'est quoi ? Une super application de paiement incluant un portefeuille, des bons plans et un réseau social innovant ! Inscription gratuite, aucun frais de transaction !"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="keywords" content="Foire aux questions, FAQ,"/>
  <meta property="og:url" content="https://fr.ozalentour.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Foire aux Questions (FAQ) - Ozalentour" />
  <meta property="og:description" content="Ozalentour c'est quoi ? Une super application de paiement incluant un portefeuille, des bons plans et un réseau social innovant ! Inscription gratuite, aucun frais de transaction !" />
  <meta property="og:site_name" content="Ozalentour®" />
  <meta property="og:image" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta property="og:image:secure_url" content="https://fr.ozalentour.com/public/faq.jpg"/>
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:alt" content="Foire aux Questions" />
  <meta property="fb:app_id" content="2500591266698535" />
  <meta property="article:publisher" content="https://www.facebook.com/Ozalentourfr/" />
  <meta name="twitter:site" content="@ozalentour"/>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Foire aux Questions (FAQ) - Ozalentour" />
  <meta name="twitter:description" content="Ozalentour c'est quoi ? Une super application de paiement incluant un portefeuille, des bons plans et un réseau social innovant ! Inscription gratuite, aucun frais de transaction !" />
  <meta name="twitter:image" content="https://fr.ozalentour.com/public/faq.jpg"/>
  <meta name="twitter:image:alt" content="Foire aux Questions"/>
  <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>

      {/* {loginModal === 0 ? ( */}
      <div className={styles.faqContainer}>
        <div className={styles.banner}>
          
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"Foire aux questions"}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"Retrouvez les questions les plus fréquement posées..."}
            </p>
          </div>
        </div>
        <div className={styles.siteContent}>
				<div className={styles.container}>
					<h2 className={styles["title"] + " " + styles["alignCenter"]}>{"Comment pouvons-nous vous aider ?"}</h2>
					<ul className={styles["accordion"] + " " + styles["firstOpen"]} >
                    
						<li onClick={() => {setShowText(1)}}>
							<h3 className={styles.accordionTitle}><a href="#">{"Pourquoi ouvrir un compte sur Ozalentour ?"}<FaPlus className={styles.testsvg}/></a></h3>
							
              <div className={showText == 1 ? styles.accordionContent : styles.accordionContentHidden}>
							  <p>{"Avec la multiplications des applications et à l'aube des supers applications. Ozalentour a pour ambition de représenter la France en réunissant tout ce qui est utile dans la vie quotidienne, aussi bien pour les particuliers que pour les professionnels. Retrouvez sur notre super app de paiement : Une portemonnaie, des bons plans et un réseau social innovant ! Gagnez ainsi du temps et de l'argent sur chaque utilisation et paiement !"}</p>
							</div>
                           
						</li>
						<li onClick={() => {setShowText(2)}}>
							<h3 className={styles.accordionTitle}><a href="#">{"Puis-je publier des promotions sur Ozalentour ?"}<FaPlus className={styles.testsvg}/></a></h3>
                            
							<div className={showText == 2 ? styles.accordionContent : styles.accordionContentHidden}>
							  <p>{"Particulier ou professionnel, profitez de notre système de promotion vous permettant de mettre en avant votre activité locale ainsi que vos offres de cashback ! "}<br/>{" Une fois référencé, commencez à encaisser vos clients via notre application multiservices Ozalentour ! "}</p>
							</div>
                            
						</li>
						<li onClick={() => {setShowText(3)}}>
              <h3 className={styles.accordionTitle}><a href="#">{"Puis-je utiliser Ozalentour au même titre qu'un TPE ?"}<FaPlus className={styles.testsvg}/></a></h3>
                            
							<div className={showText == 3 ? styles.accordionContent : styles.accordionContentHidden}>
								<p>{"La réponse est oui ! Depuis l'option 'Transaction', profitez de notre option 'Encaisser'. Cela vous permettra de recevoir sans contact les paiements de tous vos clients, sans matériel supplémentaire et en moins de 3 secondes seulement !"}</p>
							</div>
                            
						</li>
            <li onClick={() => {setShowText(4)}}>
              <h3 className={styles.accordionTitle}><a href="#">{"Comment mon portefeuille EUR est-il garanti ?"}<FaPlus className={styles.testsvg}/></a></h3>
							              
              <div className={showText == 4 ? styles.accordionContent : styles.accordionContentHidden}>
								<p>{"Chaque EURO rechargé est 100% séquestré en compte en banque ! 1 EURO rechargé = 1 EURO garanti"}</p>
							</div>
                           
						</li>
						<li onClick={() => {setShowText(5)}}>
              <h3 className={styles.accordionTitle}><a href="#">{"Puis-je retirer mon solde vers mon compte bancaire ?"}<FaPlus className={styles.testsvg}/></a></h3>
							  
              <div className={showText == 5 ? styles.accordionContent : styles.accordionContentHidden}>
                <p>{"La réponse est oui ! Depuis l'option principale de transaction, lancez le retrait de votre argent vers votre compte en banque préféré !"}</p>
              </div>
                              
						</li>
						<li onClick={() => {setShowText(6)}}>
              <h3 className={styles.accordionTitle}><a href="#">{"Le jeton OZACOIN (OZA) c'est quoi ?"}<FaPlus className={styles.testsvg}/></a></h3>

              <div className={showText == 6 ? styles.accordionContent : styles.accordionContentHidden}>
								<p>{"OZACOIN (OZA) est un actif numérique adossé à Ozalentour et 3 cryptomonnaies mondialement reconnues comme BITCOIN, ETHEREUM et BINANCE COIN. Utilisez ainsi vos Ozacoins pour recharger votre compte, il y a un mimimum de frais !"}</p>
							</div>
                            
						</li>
					</ul>
				</div>
			</div>
        </div>
      {/* ) : (
        <LoginModal />
      )} */}
    </>
  );
}