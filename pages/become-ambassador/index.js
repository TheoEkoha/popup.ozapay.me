import Head from "next/head";
import styles from "./BecomeAmbassador.module.css";
import { useContext, useState, useEffect } from "react";

export default function BecomeAmbassador() {
	 const [loadImage, setLoadImage] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoadImage(false), 1000);
  }, []);
  return (
    <>
<Head>
  <title>{"Ozalentour - Devenir Ambassadeur et/ou affilié !"}</title>
  <meta name="description" content="Devenir ambassadeur Ozalentour devient facile ! Contactez nos supports clients et devenez immédiatement apporteur d'affaires pour notre solution Ozalentour !"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="keywords" content="Devenir ambassadeur Ozalentour, devenir ambassadeur"/>
  <meta property="og:url" content="https://fr.ozalentour.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Devenir Ambassadeur et Gagner du Cash - Ozalentour" />
  <meta property="og:description" content="Commencer à gagner de l'argent dès maintenant !" />
  <meta property="og:site_name" content="Ozalentour®" />
  <meta property="og:image" content="https://fr.ozalentour.com/public/ambassadeur.jpg"/>
  <meta property="og:image:secure_url" content="https://fr.ozalentour.com/public/ambassadeur.jpg"/>
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:alt" content="Devenir parrain ozalentour" />
  <meta property="fb:app_id" content="2500591266698535" />
  <meta property="article:publisher" content="https://www.facebook.com/Ozalentourfr/" />
  <meta name="twitter:site" content="@ozalentour"/>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Devenir Ambassadeur et Gagner du Cash - Ozalentour" />
  <meta name="twitter:description" content="Commencer à gagner de l'argent dès maintenant !" />
  <meta name="twitter:image" content="https://fr.ozalentour.com/public/ambassadeur.jpg"/>
  <meta name="twitter:image:alt" content="Devenir parrain ozalentour"/>
  <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>     

      {/* {loginModal === 0 ? ( */}
      <div className={styles.pressAreaContainer}>
        <div className={styles.banner}>
          
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"Devenir Ambassadeur"}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"Faites la promotion d'Ozalentour et devenez Ambassadeur !"}
            </p>
          </div>
        </div>
        <div className={styles.siteContent}>
            <div className={styles.featuresInner}>
                <div className={styles.container}>
                    <div className={styles.ldTitle}>
						<h2>{"Trouvez le programme qui vous correspond"}</h2>
						<p>{"Choisissez parmi nos 2 programmes. Vous pouvez ajouter votre lien d'affilié sur votre site Internet et/ou le partager aux commerçants de votre région. Vous souhaitez aller plus loin ? Devenez ambassadeur et récoltez le fruit de votre travail avec 1% de commission sur l'ensemble de vos relations..."}</p>
					</div>
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							   {loadImage === false ? (
                                          <img src="devenir-ambassadeur.png" alt="Devenir ambassadeur"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                </div>
                           
                        <div className={styles.featuresInfo}>
                            <h3>{"Devenez Ambassadeur"}</h3>
                            <p>{"Commencez à parler d'Ozalentour et soyez récompensé en retour ! Inscrivez-vous, participez, et gagnez de l'argent ! C'est aussi simple que cela. Le programme de partenariat est idéal aussi bien pour ceux qui souhaitent promouvoir Ozalentour en parallèle de leur emploi que pour ceux qui veulent en faire leur activité principale. En tant que partenaire, vous êtes 'Apporteur d'Affaires'. Vous participez au développement d'Ozalentour en partageant votre code Ambassadeur. Dès 500€ rechargé sur votre compte, vous devenez Ambassadeur et vous recevez 1% sur l'ensemble des rechargements & paiements de vos relations ! Exemple : Recevez à vie 1000€/mois pour un volume apporté de 100.000€ ! Besoin d'argent en banque ? Lancez votre virement !"}</p>
                        </div>
                    </div>
                   
                    <div className={styles.featuresItem}>
                        <div className={styles.featuresThumb}>
							{loadImage === false ? (
                              <img src="devenir-affilie.png" alt="Devenir affilié"/>
                  ) : (
                    <div className={styles.containerLoader}>
                      <div className={styles.loader} />
                    </div>
                  )}
                </div>
                        
             
                        <div className={styles.featuresInfo}>
                            <h3>{"Devenez Affilié"}</h3>
                            <p>{"Ce programme est idéal pour ceux qui sont présents en ligne. Il vous suffit de parler des produits Ozalentour et d'ajouter votre lien d'affiliation unique. Vous recevrez ensuite une commission de 2,5% pour chaque vente effectuée. En tant que partenaire affilié en ligne, vous aurez accès à notre plateforme créative et à une page dédiée à prix réduit. Vous pourrez également demander de l'aide à notre équipe d'affiliation Ozalentour pour faire de notre partenariat un succès.. "}</p>
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