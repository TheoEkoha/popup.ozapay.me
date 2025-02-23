import styles from "./Wallet.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { getCookie } from "cookies-next";
import axios from "axios";
import variables  from "../../../variables.json";

export default function Wallet() {
  const { menuPage, setMenuPage, userData, menu, setMenu,availableModal,
    setAvailableModal } =
    useContext(DataContext);

  const [OZP, setOZP] = useState();
  const ref = useRef();

  let token = getCookie("token");

  function NotAvailableModal() {
    setAvailableModal(true);
  }
  
  
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

  useEffect(() => {
    axios
      .post(
		 `${variables.DATA_URL}/user/getData`,
        //`https://apin92.ozalentour.com/userData`,
        {
          token: token,
        },
        {
          //withCredentials: true,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(function (res) {
		console.log(res.data);
        setOZP(res.data.EUR);
      });
  }, [menuPage]);

  return (
    <div className={styles.walletBackground}>
      <div className={styles.walletContainer}>
        <div className={styles.wallet} ref={ref}>
          <div className={styles.walletHeader}>
            <div
              className={styles.arrowHeader}
              onClick={() => setMenuPage("home")}
            ></div>
            <p>{"Mon Wallet"}</p>
            <img
              className={styles.searchHeader}
              src="loupe.png"
              alt="rechercher"
            />
          </div>
          <div className={styles.walletMain}>
            <div className={styles.walletSquare}>
              {/*  <button
                  className={styles.rechargeButton}
                  onClick={() => {
                    setMenuPage("recharge");
                  }}
                >
                  {"Recharger"}
                </button> */}
              
              <div className={styles.walletSquareHeader}>   
                <p>{"SOLDE"}</p>
                <p className={styles.ozaphyreAmount}>{OZP } { "€EUR"}</p>
                <p>{"soit 0 EUR"}</p>
                <div className={styles.ozaphyreCurrency}>
              </div>  
            </div>
 
              
              <div className={styles["smallSquare"] + " " + styles["squareOZA"]}>
              <div>
                <p className={styles.connectwallet}>{"Placement OZACOIN(OZA)"}</p>
                <p>248.114,00 OZA</p>
               </div>
               <div className={styles.squareContentRight}>
                <p>+110 %</p>
                <p>sur 24 h</p>
               </div>
              </div>
          </div>
          <div className={styles.optionsContainer}>
            <div onClick={NotAvailableModal} className={styles.options}><img className={styles.collect} src="encaisser.png"></img><p>Encaisser</p></div>
            <div onClick={NotAvailableModal} className={styles.options}><img className={styles.transfer} src="envoyer.png"></img><p>Envoyer</p></div>
            <div onClick={NotAvailableModal} className={styles.options}><img className={styles.askcash} src="demander.png"></img><p>Demander</p></div>
            <div onClick={NotAvailableModal} className={styles.options}><img className={styles.convert} src="convertir.png"></img><p>Convertir</p></div>
          </div>
            <p className={styles.transactonsTitle}>{"Transactions"}</p>
            <div className={styles.transactionsContainer}>
              <div className={styles.transaction}>
                <img
                  className={styles.transactionBubble}
                  src="envoiBubble.png"
                  alt="envoi"
                />
                <div className={styles.transactionInfos}>
                  <p className={styles.transactionName}>{"Envoi -T. Dupont"}</p>
                  <p className={styles.transactionDate}>{"Le 03 mai 2022"}</p>
                </div>
                <div className={styles.montantTransaction}>
                  <p className={styles.transactionAmount}>{" - 1500 €EUR"}</p>
                </div>
              </div>
              <div className={styles.transaction}>
                <img
                  className={styles.transactionBubble}
                  src="locationBubble.png"
                  alt="paiement"
                />
                <div className={styles.transactionInfos}>
                  <p className={styles.transactionName}>{"Paiement - Hébergement"}</p>
                  <p className={styles.transactionDate}>{"Le 02 mai 2022"}</p>
                </div>
                
                <div className={styles.montantTransaction}>
                  <p className={styles.transactionAmount}>{" - 150 €EUR"}</p>
                </div>

                
              </div>

              <div className={styles.transaction}>
                <img
                  className={styles.transactionBubble}
                  src="calculatriceBubble.png"
                  alt="paiement"
                />
                <div className={styles.transactionInfos}>
                  <p className={styles.transactionName}>{"Encaissement - FACTURE"}</p>
                  <p className={styles.transactionDate}>{"Le 02 mai 2022"}</p>
                </div>
                
                <div className={styles.montantTransaction}>
                  <p className={styles.transactionAmount}>{" + 500,00 €EUR"}</p>
                </div>
              </div>

              <div className={styles.transaction}>
                <img
                  className={styles.transactionBubble}
                  src="recept-rond.png"
                  alt="paiement"
                />
                <div className={styles.transactionInfos}>
                  <p className={styles.transactionName}>{"Réception- J. Dupond"}</p>
                  <p className={styles.transactionDate}>{"Le 01 mai 2022"}</p>
                </div>
                
                <div className={styles.montantTransaction}>
                  <p className={styles.transactionAmount}>{" + 1500,00 €EUR"}</p>
                </div>
                

                
              </div>


             

              <div className={styles.transaction}>
                <img
                  className={styles.transactionBubble}
                  src="transfer-test.png"
                  alt="encaissement"
                />
                <div className={styles.transactionInfos}>
                  <p className={styles.transactionName}>
                    {" Echange €EUR/EUR"}
                  </p>
                  <p className={styles.transactionDate}>{"Le 2 Avril 2022"}</p>
                </div>
                
                <div className={styles.montantTransaction}>
                  <p className={styles.transactionAmount}>{" - 2.500,00 €EUR"}</p>
                </div>
              </div>
              <div className={styles.transaction}>
                <img
                  className={styles.transactionBubble}
                  src="ozp-rond.png"
                  alt="reception"
                />
                <div className={styles.transactionInfos}>
                  <p className={styles.transactionName}>
                    {"Rechargement - €EUR"}
                  </p>
                  <p className={styles.transactionDate}>{"Le 29 avril 2022"}</p>
                </div>
                <div className={styles.montantTransaction}>
                  <p className={styles.transactionAmount}>{" + 1500 €EUR"}</p>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
