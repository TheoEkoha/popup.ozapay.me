import styles from "./QrCode.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import QRCode from "react-qr-code";
import { getCookie } from "cookies-next";

export default function QrCode() {
  const { menuPage, setMenuPage, amount, setAmount, menu, setMenu } =
    useContext(DataContext);

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

  let publicKey = getCookie("publicKey");

  let qrCodeValue = JSON.stringify({
    recipientAddress: publicKey,
    amount: amount,
  });

  return (
    <div className={styles.qrCodeBackground}>
      <div className={styles.qrCodeContainer}>
        <div className={styles.qrCode} ref={ref}>
          <div className={styles.qrCodeHeader}>
            <div
              className={styles.arrowHeader}
              onClick={() => setMenuPage("collect")}
            ></div>
            <p className={styles.titleHeader}>{"Encaisser"}</p>
          </div>
          <div className={styles.qrCodeMain}>
            <p className={styles.transactionAmount}>{amount}</p>

            <div className={styles.qrCodeInfos}>
              <div className={styles.qrCodebox}>
                <QRCode
                  title="Encaisser"
                  value={qrCodeValue}
                  bgColor="#ffffff"
                  fgColor="#363636"
                  size={230}
                />
              </div>

              <p className={styles.transactionMessage}>
                {"FAITES SCANNER CE QR CODE ET RECEVEZ "}{ amount } {" OZP POUR CETTE FACTURE !"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
