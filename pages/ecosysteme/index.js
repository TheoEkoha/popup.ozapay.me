import Head from "next/head";
import styles from "./EcoSysteme.module.css";

import { useContext, useState, useEffect } from "react";
export default function EcoSysteme() {
	 const [loadImage, setLoadImage] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoadImage(false), 1000);
  }, []);
  return (
    <>
<Head>
  <title>{"La Super App du Quotidien offrant du temps et de l'argent : Ozalentour"}</title>
  <meta name="description" content="Tous les besoins de votre quotidien en une seule super app ! Un Compte, un RIB, une CB et du Cashback jusqu'à 70%, ainsi que de multiples services exceptionnels !"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="keywords" content="Ecosystème Ozalentour"/>
  <meta property="og:url" content="https://fr.ozalentour.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="La Super App du Quotidien offrant du temps et de l'argent : Ozalentour" />
  <meta property="og:description" content="Tous les besoins de votre quotidien en une seule super app ! Un Compte, un RIB, une CB et du Cashback jusqu'à 70%, ainsi que de multiples services exceptionnels !" />
  <meta property="og:site_name" content="Ozalentour®" />
  <meta property="og:image" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta property="og:image:secure_url" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:alt" content="Le système Ozalentour" />
  <meta property="fb:app_id" content="2500591266698535" />
  <meta property="article:publisher" content="https://www.facebook.com/Ozalentourfr/" />
  <meta name="twitter:site" content="@ozalentour"/>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="La Super App du Quotidien offrant du temps et de l'argent : Ozalentour" />
  <meta name="twitter:description" content="Tous les besoins de votre quotidien en une seule super app ! Un Compte, un RIB, une CB et du Cashback jusqu'à 70%, ainsi que de multiples services exceptionnels !" />
  <meta name="twitter:image" content="https://fr.ozalentour.com/public/ozacoin.jpg"/>
  <meta name="twitter:image:alt" content="Le système Ozalentour"/>
  <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>   

      {/* {loginModal === 0 ? ( */}
      <div className={styles.pressAreaContainer}>
        <div className={styles.banner}>
          
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"La Super-App du Quotidien"}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"Une seule Super App pour tous vos besoins de la vie courante !"}
            </p>
          </div>
        </div>
        <div className={styles.siteContent}>
            <div className={styles.featuresInner}>
                <div className={styles.container}>
                    <div  id="account"  className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                       <img src="register.png" alt="Ouvrir un compte Ozalentour"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                </div>
                           
                        <div className={styles.featuresInfo}>
                            <h3><span>{"Un Compte social"}</span>{" facilitant les paiements et les encaissements !"}</h3>
                            <p>{"Nouveau ? Rejoignez Ozalentour et Profitez d'un compte social sans banque vous permettant d'envoyer et de recevoir de l'argent instantanément, soit depuis notre place de marché, soit sans contact chez vos commerçants préférés. Combien ça coûte ? C'est intégralement gratuit dans les deux sens. Alors qu'attendez-vous ? Profitez-en !"}</p>
                        </div>
                    </div>
                    <div id="plans" className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                   <img src="shop.png" alt="Trouver des Bons Plans Ozalentour"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                           
                    </div>
                        <div className={styles.featuresInfo}>
                            <h3><span>{"Expérimentez votre proximité"}</span>{" et gagnez de l'argent tout en vous amusant !"}</h3>
                            <p>{"Vendez aussi facilement en ligne qu'en magasin et Gagnez du cashback sur chacune de vos nouvelles expériences. Professionnel ? Faites enfin la promotion gratuite de votre entreprise et de vos biens & services en échange d'un petit pourcentage de cashback. Allégez vos dépenses et facilitez vous ainsi la vie et celle de votre entreprise !"}</p>
                        </div>
                    </div>
                    <div id="news-feed" className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							 {loadImage === false ? (
                  <img src="news-feeds.png" alt="Devenir Populaire"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                         
                        </div>
                        <div className={styles.featuresInfo}>
                            <h3><span>{"Facilitez vos échanges en communauté"}</span>{" et légitimez votre popularité !"}</h3>
                            <p>{"Via Ozalentour, restez en contact avec vos relations et profitez d'une communauté favorisant les échanges de proximité ! Un talent à partager ? Publiez vos contenus sur notre réseau social et obtenez un maximum de Coups de coeur. Plus vous recevez de likes, plus vous en serez visible et populaire selon votre proximité. Bonne chance !"}</p>
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