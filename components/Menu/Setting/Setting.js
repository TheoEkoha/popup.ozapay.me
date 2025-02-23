import styles from "./Setting.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCallback, useRef, useState, useEffect, useContext } from "react";
import { DataContext } from "../../Context";
import { getCookie, removeCookies } from "cookies-next";
import variables from "../../../variables.json";

export default function Setting() {
  const {
    menu,
    setMenu,
    menuPage,
    setMenuPage,
    availableModal,
    setAvailableModal,
  } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
	
  let data = {
    firstName: getCookie("firstName"),
    lastName: getCookie("lastName"),
  };

  return (
    <>
      <div className={styles.SettingBackground}>
        <div className={styles.SettingContainer}>
          <div className={styles.Setting} ref={ref}>
            <div className={styles.SettingHeader}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("home")}
              ></div>
              <p className={styles.test}>{"Paramètres"} </p>
            </div>
            
            <div className={styles.SettingRadius}>
              <div className={styles.SettingMain}>
                <div className={styles.settingTop}>
                  <img className={styles.avatar} src="profileIcon.png" />
                  <div className={styles.settingProfile}>
                   <p>
                    {data.firstName} {data.lastName}
                  </p>
                  <p>@jdecottignies</p>
                  </div>
                  <div className={styles.settingTopRight}>
                    <img src="shareBlack.svg" />
                  </div>
                </div>
                <div>
                  <h2>Configuration du compte</h2>
                </div>
                <div className={styles.parameterMenu}>
                  <div>
                    <img src="profile.svg" />
                    <p>Informations personnelles</p>
                  </div>
                  <div>
                    <img src="wallet.svg" />
                    <p>Moyens de paiement</p>
                  </div>
                  <div>
                    <img src="priceTag.svg" />
                    <p>Offres et abonnements</p>
                  </div>
                  <div>
                    <img src="notification.svg" />
                    <p>Notifications</p>
                  </div>
                  <div>
                    <img src="padlock.svg" />
                    <p>Sécurités du compte</p>
                  </div>
                  <div>
                    <img src="spy.svg" />
                    <p>Confidentialité</p>
                  </div>
                  <div>
                    <img src="kyc.svg" />
                    <p>Vérification utilisateur</p>
                  </div>
                  <div>
                    <img src="affiliateMarketing.svg" />
                    <p>Affilier un ami, une relation</p>
                  </div>
                </div>
                <div className={styles.desactivateButton}>
                  <p>Désactiver mon compte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
