import styles from "./WalletID.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import QRCode from "react-qr-code";
import { getCookie } from "cookies-next";

export default function WalletID() {
  const { menuPage, setMenuPage, userData, menu, setMenu } =
    useContext(DataContext);

    const [copyModal, setCopyModal] = useState(0);
    let publicKey = getCookie("publicKey");

    const copyWalletAddress = () => {
      navigator.clipboard.writeText(publicKey);
      setCopyModal(1);
    }
  
    let qrCodeValue = JSON.stringify({
    publicKey,
  });
  
  const ref = useRef();

  useEffect(() => {
    const toggleMenu = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (menu && ref.current && !ref.current.contains(e.target)) {
        setMenu(false);
        setMenuPage("home");
      }
    };

    document.addEventListener("mousedown", toggleMenu);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", toggleMenu);
    };
  }, [menu]);

  return (
    <div className={styles.walletIDBackground}>
      <div className={styles.walletIDContainer}>
        <div className={styles.walletID} ref={ref}>
          <div className={styles.walletIDHeader}>
            <div
              className={styles.arrowHeader}
              onClick={() => setMenuPage("home")}
            ></div>
            <p>{"Portefeuille ID"}</p>
            <img
              className={styles.searchHeader}
              src="loupe.png"
              alt="rechercher"
            />
          </div>
          <div className={styles.walletIDMain}>
            <div className={styles.qrCodeContainer}>
              <img className={styles.ozaLogo} src="oza-logo.png" alt="logo" />
              <QRCode
                title="PortefeuilleID"
                value={qrCodeValue}
                bgColor="#ffffff"
                fgColor="#363636"
                size={180}
              />

              <p className={styles.publicKey}>{publicKey}</p>
            </div>

            <p className={styles.walletIDMessage}>
              {"Partagez votre clé publique OZAPHYRE (OZP) et Recevez du cash en"}
              {"moins de 3 secondes !"}
            </p>

            <div
              className={styles.copyKeyContainer}
              onClick={copyWalletAddress}
            >
              <img className={styles.copyKeyPicture} src="copy.png" alt="" />
              <p className={styles.copyKeyMessage}>{"Copier"}</p>
            </div>
            <div className={copyModal == 1 ? styles.copymodal : styles.copymodalHidden}>
							  <p>{"Votre adresse a été copiée"}</p>
		    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
