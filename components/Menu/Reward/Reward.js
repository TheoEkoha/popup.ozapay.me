import styles from "./Reward.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCallback, useRef, useState, useEffect, useContext } from "react";
import { DataContext } from "../../Context";
import { getCookie, removeCookies } from "cookies-next";
import variables from "../../../variables.json";

export default function Reward() {
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

  return (
    <>
      <div className={styles.RewardBackground}>
        <div className={styles.RewardContainer}>
          <div className={styles.Reward} ref={ref}>
            <div className={styles.RewardHeader}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("home")}
              ></div>
              <p className={styles.test}>{"Récompenses"} </p>
            </div>
            <div className={styles.RewardRadius}>
              <div className={styles.RewardMain}>
                <div>
                  <h2>Espace Ambassadeur</h2>
                </div>
                <div className={styles.boxAmbassadorContainer}>
                  <div
                    className={
                      styles["boxAmbassador"] +
                      " " +
                      styles["boxAmbassadorBlue"]
                    }
                  >
                    <p className={styles.topText}>Gains cumulés</p>
                    <p className={styles.middleText}>1.500,00€</p>
                    <p className={styles.bottomText}>depuis le début</p>
                  </div>
                  <div
                    className={
                      styles["boxAmbassador"] +
                      " " +
                      styles["boxAmbassadorYellow"]
                    }
                  >
                    <p className={styles.topText}>Gains cumulés</p>
                    <p className={styles.middleText}>500,00€</p>
                    <p className={styles.bottomText}>sous 30 jours</p>
                  </div>
                  <div
                    className={
                      styles["boxAmbassador"] + " " + styles["boxAmbassadorRed"]
                    }
                  >
                    <p className={styles.topText}>Prime</p>
                    <p className={styles.middleText}>1%</p>
                    <p className={styles.bottomText}>sur vos affiliés</p>
                  </div>
                </div>
                <h2>Mon Code Ambassadeur</h2>
                <div className={styles.inputContainer}>
                  <input placeholder="OZA-JOHANDECO-23" />
                  <img className={styles.qrCode} src="qrCodeIcon.svg" />
                  <div className={styles.buttonCopy}>
                    <img src="copySecondIcon.svg" />
                    <p>Copier</p>
                  </div>
                </div>
                <div className={styles.media}>
                  <img className={styles.share} src="share.svg" />
                  <img src="telegram.svg" />
                  <img src="facebook.svg" />
                  <img src="whatsapp.svg" />
                  <img src="sms.svg" />
                </div>
                <h2>Gains récents</h2>
                <div className={styles.bottomReward}>
                  <div
                    className={styles["row"] + " " + styles["rowMarginBottom"]}
                  >
                    <div className={styles.columnLeft}>
                      <img className={styles.vector} src="vector.png" />
                      <div>
                        <p>La Ferme aux Oies</p>
                        <p>TRANSACTION ID18741657</p>
                      </div>
                    </div>

                    <div className={styles.columnRight}>
                      <img src="plusIcon.svg" />
                      <p>200€</p>
                    </div>
                  </div>
                  <div
                    className={styles["row"] + " " + styles["rowMarginBottom"]}
                  >
                    <div className={styles.columnLeft}>
                      <div className={styles.cashbackIcons}>
                        <img src="refund.svg" />
                        <img src="€.svg" />
                      </div>
                      <div>
                        <p>Yacine Popo</p>
                        <p>TRANSACTION ID154724687</p>
                      </div>
                    </div>

                    <div className={styles.columnRight}>
                      <img src="plusIcon.svg" />
                      <p>980€</p>
                    </div>
                  </div>
                  <div
                    className={styles["row"] + " " + styles["rowMarginBottom"]}
                  >
                    <div className={styles.columnLeft}>
                      <img className={styles.vector} src="vector.png" />
                      <div>
                        <p>First Class</p>
                        <p>TRANSACTION ID154724687</p>
                      </div>
                    </div>

                    <div className={styles.columnRight}>
                      <img src="plusIcon.svg" />
                      <p>200€</p>
                    </div>
                  </div>
                  <div
                    className={styles["row"] + " " + styles["rowMarginBottom"]}
                  >
                    <div className={styles.columnLeft}>
                      <img className={styles.vector} src="vector.png" />
                      <div>
                        <p>La Suite</p>
                        <p>TRANSACTION ID154724687</p>
                      </div>
                    </div>

                    <div className={styles.columnRight}>
                      <img src="plusIcon.svg" />
                      <p>115€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
