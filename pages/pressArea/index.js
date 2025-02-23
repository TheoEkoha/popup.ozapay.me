import styles from "./EspacePresse.module.css";


export default function EspacePresse() {
  return (
    <>
     

      {/* {loginModal === 0 ? ( */}
      <div className={styles.pressAreaContainer}>
        <div className={styles.banner}>
          
          <div className={styles.pageTitleContent}>
            <h1 className={styles.pageTitleContent.h1}>
              {"Espace Presse"}
            </h1>
            <p className={styles.pageTitleContent.p}>
            {"À propos de Ozalentour, partenaires et articles récents"}
            </p>
          </div>
        </div>
        <div className={styles.imgBoxInner}>
          <div className={styles.container}>
            <div className={styles.circlebox}>
              <div className={styles.topImagePress} alt="bloc"><p>Création 2019</p> </div>
              <div className={styles.topImagePress} alt="bloc"><p>Plus de 2800 comptes</p></div>
              <div className={styles.topImagePress} alt="bloc"><p>Déjà 396 activités</p></div>
              
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.ldTitle}>
            <h2>{"À propos d'Ozalentour"}</h2>
          </div>
          <div className={styles.featuresItem}>
            <div className={styles.featuresInfo}>
              <p>{"Chacun devrait pouvoir entreprendre facilement et accepter des paiements sans contrainte. C’est pourquoi, depuis fin 2019, Ozalentour SAS développe sa vision d’un monde où les entrepreneurs, les indépendants et les passionnés peuvent mettre à disposition leurs talents et gérer leur trésorerie aussi simplement qu'un jeu d'enfant. C’est en proposant des solutions innovantes, à l’instar de notre solution Ozalentour ou encore de notre jeton de soutien OZACOIN (OZA), que des milliers de personnes ont décidé de nous faire confiance, aussi bien pour leurs paiements que pour leurs communications digitales."}</p>
            </div>
            <div className={styles.featuresInfo}>
              <p>{"2023 est l’année où Ozalentour accompagne le développement des petits commerces et des indépendants en élargissant sa gamme de produits pour ainsi répondre à l'évolution des technologies. Retrouvez ainsi sur Ozalentour : Un compte pour payer, encaisser et transférer de l'argent partout où que vous soyez ! Entrepreneur ? Facilitez vous la vie avec notre système d'édition de devis/factures, gérez vos relations, vos stocks et vos transactions... Besoin de trésorerie ? Retirez et transférez votre solde vers votre compte en banque ! "}</p>
            </div>
          </div>
        </div> 
        <div className={styles.container}>
          <div className={styles.imgBoxInnerPartner}>
            <div className={styles.ldTitle}>
              <h2>{"Partenaires"}</h2>
            </div>
            <div className={styles.containerPartner}>
              <img src="dogfinance.png"/>
              <img src="vespia.png"/>
              <img src="cresco.png"/>
            </div>
          </div>
        </div>
        <div className={styles.ldTitle}>
          <h2>{"Articles de presse"}</h2>
        </div>
        <div className={styles.newsFeeds}>
          <a className={styles.article}>
            <h3>{"Ozalentour ré-oriente son concept vers une passerelle de paiement incluant un module d'échange décentralisé !"}</h3>
            <div className={styles.effet}>{"Prochainement sur Cryptonews "}</div>
          </a>
          <a className={styles.article}>
            <h3>{"Ozalentour, la plateforme made in France qui allie bons plans, cryptomonnaie et plaisir !"}</h3>
            <div className={styles.effet}>{"French Morning 03/11/2021"}</div>
          </a>
          <a className={styles.article}>
            <h3>{"Les 5 bonnes raisons de soutenir Ozalentour"}</h3>
            <div className={styles.effet}>{"CryptoNews - le 15/05/2020"}</div>
          </a>
          <a className={styles.article}>
            <h3>{"Adopte un Projet Crypto : Ozalentour"}</h3>
            <div className={styles.effet}>Cointribune - le 26/04/2020</div>
          </a>
        </div>
      </div>
      {/* ) : (
        <LoginModal />
      )} */}
    </>
  );
}