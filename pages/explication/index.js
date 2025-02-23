import Head from "next/head";
import styles from "./Explication.module.css";
import { DataContext } from "../../components/Context";
import { useState, useEffect, useContext } from "react";
export default function Explication() {
  const { loginModal, setLoginModal} = useContext(DataContext);

  function openModal() {
    setLoginModal(1);
  }
  const [loadImage, setLoadImage] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoadImage(false), 1000);
  }, []);
  return (
    <>
<Head>
  <title>{"Ozalentour - Explications en vidéo et fonctionnement"}</title>
  <meta name="description" content="Découvrez ici tout ce que vous devez savoir pour une bonne utilisation de notre super application Ozalentour : Compte social sans banque, explorateur et réseau social de proximité..."/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="keywords" content="Explication Ozalentour, Comment ça marche Ozalentour,"/>
  <meta property="og:url" content="https://fr.ozalentour.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Comment ça marche Ozalentour ? - Explications" />
  <meta property="og:description" content="Découvrez ici tout ce que vous devez savoir pour une bonne utilisation de notre super application Ozalentour : Compte social sans banque, explorateur et réseau social de proximité..." />
  <meta property="og:site_name" content="Ozalentour®" />
  <meta property="og:image" content="https://fr.ozalentour.com/public/explications.jpg"/>
  <meta property="og:image:secure_url" content="https://fr.ozalentour.com/public/explications.jpg"/>
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:alt" content="Comment ça marche Ozalentour ?" />
  <meta property="fb:app_id" content="2500591266698535" />
  <meta property="article:publisher" content="https://www.facebook.com/Ozalentourfr/" />
  <meta name="twitter:site" content="@ozalentour"/>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Explications et fonctionnement - Ozalentour" />
  <meta name="twitter:description" content="Découvrez ici tout ce que vous devez savoir pour une bonne utilisation de notre super application Ozalentour : Compte social sans banque, explorateur et réseau social de proximité...
" />
  <meta name="twitter:image" content="https://fr.ozalentour.com/public/explications.jpg"/>
  <meta name="twitter:image:alt" content="Comment ça marche Ozalentour ?"/>
  <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>    

      {/* {loginModal === 0 ? ( */}
      <div className={styles.teamContainer}>
        <div className={styles.banner}>
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"Explication en Vidéo "}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"Ozalentour : L'App de Paiement 3.0"}
            
            </p>
          </div>
        </div>
       
        
         
          <div className={styles.companyInfo}>
            <div className={styles.ciContent}>
              <span className={styles.explanationCard}>Gagnez enfin du temps et de l'argent !</span>
              <h2>{"Ozalentour c'est quoi ?"}</h2>
              <p>{"Conçu principalement pour faciliter les transactions et la croissance, Ozalentour a également pour vocation d'apporter une solution multiservices compatible avec les cryptomonnaies ! Disponible en bêta test sur Android et prochainement sur Apple, découvrez une solution innovante ayant pour usage de faciliter les échanges, les investissements, l'auto-rémunération par des actions simples, ainsi que les paiements depuis Lille et selon votre proximité ! (nouvelle vidéo en approche, patience...)"}</p><br/>
              <a onClick={openModal} className={styles.btn}>{"Se Connecter"}</a>
            </div>

           
              
           
          </div>
        
        
        
       
      </div>
      {/* ) : (
        <LoginModal />
      )} */}
    </>
  );
}
