import styles from "./SucessConnectBSC.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { useForm } from "react-hook-form";
import { getCookie, removeCookies } from "cookies-next";
import axios from "axios";
import variables from "../../../variables.json";

export default function SucessConnectBSC() {
  const {
    menuPage,
    setMenuPage,
    amount,
    setAmount,
    menu,
    setMenu,
    setOpenConnectBSCWallet,
    setBSCWallet,
  } = useContext(DataContext);

	
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

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", toggleMenu);
    };
  }, [menu]);

  return (
    <>
      <div className={styles.SucessConnectBSCBackground}>
        <div className={styles.SucessConnectBSCContainer}>
          <div className={styles.SucessConnectBSC} ref={ref}>
            <div className={styles.header}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("connectbscwallet")}
              ></div>
              <p className={styles.titleHeader}>Succès</p>
            </div>
            <img className={styles.OZALogo} src="ozacoin.jpg" alt="OZALogo" />
            <div className={styles.titleContainer}>
              <p className={styles.title}>{"Importation du portefeuille"}</p>
              <p className={styles.title}>OZACOIN (OZA) réussie !</p>
            </div>
            <p className={styles.text}>Félicitations, vous pouvez maintenant utiliser l’application avec vos OZACOIN's (OZA)</p>
            <div className={styles.returnContainer}>
              <button
                className={styles.return}
                onClick={() => {
                  setMenuPage("home");
                }}
              >
                <p className={styles.submitText}>Retour</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
