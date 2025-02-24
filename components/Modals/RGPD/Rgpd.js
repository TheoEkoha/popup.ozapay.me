import styles from "./Rgpd.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { setCookies, getCookie, getCookies } from "cookies-next";
import axios from "axios";

export default function Rgpd() {
  const { setRgpd } = useContext(DataContext) ?? {};
const [showModal, setShowModal ] = useState(false);
 useEffect(() => {
  setTimeout(setShowModal(true), 2000);
	 
 },[]);


  const onSubmitAccepted = (req) => {
    setCookies('CookieRgpd',{key:"true"}); 
   setRgpd(true); 
  }

  const onSubmitRefuseCookie=()=>{
    setCookies('CookieRgpd', {key:"false"});
    setRgpd(true); 
  }

return (
  <>
  <div  className={showModal ? styles.ousiteRGPD : styles.modalHidden}>
  <div className={showModal ? styles.modalRGPD : styles.modalHidden}>
    <div>
      <div className={styles.ozalentourlogo}>
      <a title="Logo Ozapay" href="https://fr.ozapay.com" className="sitebrandlogo">
        <img src="ozaLogo.png" alt="Ozapay"/>
        </a>
      </div>
      <div className={styles.contenurgpd}>
        <h2> L'utilisation des cookies chez Ozapay.</h2>

        <p>Nous utilisons les types de cookies suivants sur notre site :</p>
          <ul>
            <li className={styles.lirgpd}>
        a. Cookies fonctionnels : Nous les utilisons pour mémoriser toutes les sélections que vous faites sur notre site afin qu’elles soient sauvegardées pour vos prochaines visites.
            </li>
            <li className={styles.lirgpd}>
        b. Cookie analytiques : Cela nous permet d’améliorer la conception et la fonctionnalité de notre site en recueillant des données sur le contenu auquel vous accédez et sur lequel vous vous accrochez enutilisant notre site.
            </li>
            <li className={styles.lirgpd}>
        c. Cookies de ciblage : Ces cookies collectent des données sur la façon dont vous utilisez le site et vos préférences. Cela nous permet de rendre les informations que vous voyez sur notre site plus promotionnelles et ciblées pour vous.
            </li>
          </ul>
        <p>
      Si vous cliquez sur "Accepter les cookies", toutes catégories seront activées afin d'optimiser votre visite en ligne. Si toutefois vous décidez de les refuser, toutes les fonctions d'ozalentours seront désactivés.
      </p>
      <p> <a style="color:#00b9c6;" target="_blank" title="Mentions Légales"  >Plus d'informations sur notre politique de confidentialité.</a></p>
      </div>
    </div>
    <div className={styles.buttonrgpd}>
        <button className={styles.Refuser} onClick={
                        onSubmitRefuseCookie
                      } >Refuser </button>
        <button className={styles.Accepter}  onClick={
                        onSubmitAccepted
                      } >Accepter </button>
    </div>
  </div>
</div>
  </>
)
  }

