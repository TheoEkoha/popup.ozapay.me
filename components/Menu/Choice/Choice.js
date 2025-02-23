import styles from "./Choice.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { getCookie, removeCookies } from "cookies-next";
import axios from "axios";
import variables from "../../../variables.json";
import ConnectBSCWallet from "../ConnectBSCWallet/ConnectBSCWallet";

export default function Choice() {
  const {
    menu,
    setMenu,
    menuPage,
    setMenuPage,
    availableModal,
    setAvailableModal,
    openConnectBSCWallet,
    setOpenConnectBSCWallet,
    BSCWallet,
    setBSCWallet,
    BSCAmount,
    setBSCAmount,
  } = useContext(DataContext);

  const { userData, setUserData } = useState({});
  const [OZP, setOZP] = useState();

  const [menuComponent, setMenuComponent] = useState(null);
  const [test, setTest] = useState(false);
  const ref = useRef();
  const [showDiv, setShowDiv] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showWallet, setShowWallet] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  let token = getCookie("token");
  function NotAvailableModal() {
    setAvailableModal(true);
  }
  const handleClick = () => {
    setShowDiv(!showDiv);
    setIsExpanded(!isExpanded);
  };

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

  let userTag = data.firstName.charAt(0);
  userTag = "@" + userTag + data.lastName;
  userTag = userTag.toLowerCase();

  useEffect(() => {
    axios
      .post(
        `${variables.DATA_URL}/user/getData`,
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
        const ozpAmount = res.data.EUR;
        // Replace dot with comma
        const formattedAmount = ozpAmount.toString().replace(".", ",");

        if (ozpAmount >= 1000 && ozpAmount < 10000) {
          const parts = formattedAmount.split(",");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          setOZP(parts.join(","));
        } else {
          const formattedAmountWithComma = formattedAmount.replace(".", ",");
          setOZP(formattedAmountWithComma);
        }
        let BSCookie = getCookie("BSCWallet");
        axios
          .post(
            `${variables.DATA_URL}/user/getBSCBalance`,
            {
              token: token,
              BSCWallet: res.data.BSCWallet,
            },
            {
              //withCredentials: true,
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
            }
          )
          .then(function (response) {
            setBSCAmount(response.data);
            setBSCWallet(BSCookie);
            console.log(BSCWallet);
          });
      });
  }, [menuPage]);

  const logOut = () => {
    removeCookies("token");
    removeCookies("publicKey");
    removeCookies("firstName");
    removeCookies("lastName");
    removeCookies("OZP");

    setMenu(false);
  };
  console.log(BSCWallet);

  const handleWallet = (divIndex) => {
    setShowWallet(divIndex);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(BSCWallet);
    setIsCopied(true);
  };
  return (
    <>
      {openConnectBSCWallet ? <ConnectBSCWallet /> : null}
      <div className={styles.ChoiceBackground}>
        <div className={styles.ChoiceContainer}>
          <div className={styles.Choice} ref={ref}>
            <div className={styles.menuHeader}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("home")}
              ></div>
              <p className={styles.test}>{"Mon Compte"} </p>
              <img src="exchange.png" />
            </div>
            <div className={styles.menuTopContainer}>
              <div className={styles.menuTop}>
                <img className={styles.avatar} src="profileIcon.png" />
                <div className={styles.menuTopSmall}>
                  <div className={styles.menuProfile}>
                    <p>
                      {data.firstName} {data.lastName}
                    </p>
                    <p>@jdecottignies</p>
                  </div>
                  <div className={styles.menuTopRight}>
                    <p>Liberty</p>
                    <img src="circularLine.png" />
                  </div>{" "}
                </div>
              </div>

              {showWallet === 0 ? (
                <div className={styles.walletContainer}>
                  <div className={styles.rowImage}>
                    <div className={styles.walletTopLeftRow}>
                      <img src="walletIconEuro.png" />
                      <p className={styles.wallet}>{"Mes EUROS"}</p>
                    </div>
                    <div className={styles.iconsWalletRight}>
                      <img onClick={() => handleWallet(1)} src="eurOIcon.svg" />
                      <img
                        onClick={() => handleWallet(1)}
                        src="ozaCoinIcon.svg"
                      />
                    </div>
                  </div>
                  <div className={styles.centerRow}></div>
                  <p className={styles.walletAmount}>
                    {OZP}
                    {"€"}
                  </p>
                  <div className={styles.column}>
                    <p className={styles.centerx3}>Soit 6250 OZACOINS </p>
                    <div
                      className={styles.transfer}
                      onClick={() => setMenuPage("choice")}
                    >
                      <img src="transferIcon.png" />
                      <p>Envoyer/Recevoir</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    styles["walletContainer"] +
                    " " +
                    styles["walletContainerOZA"]
                  }
                ></div>
              )}
            </div>
            <div className={styles.menuBottomContainer}>
              <div className={styles.topContent}>
                <p>Envoyer & Recevoir</p>
                <p>
                  Envoyez de l’argent, encaissez, échangez et transférez des
                  fonds partout, tout le temps !
                </p>
              </div>
              <div className={styles.boxChoice}>
                <div
                  className={
                    styles["containerIcons"] +
                    " " +
                    styles["containerIconBlack"]
                  }
                >
                  <img src="convertIcon.svg" />
                </div>
                <div>
                  <p>Convertisseur EUR/OZA</p>
                  <p>Achetez & échangez vos actifs</p>
                </div>
              </div>
              <div className={styles.boxChoice}>
                <div
                  className={
                    styles["containerIcons"] +
                    " " +
                    styles["containerIconYellow"]
                  }
                >
                  <img src="transferIcon.svg" />
                </div>
                <div>
                  <p>Transférer des fonds</p>
                  <p>Envoi sans contact ou via notification</p>
                </div>
              </div>
              <div className={styles.boxChoice}>
                <div
                  className={
                    styles["containerIcons"] + " " + styles["containerIconBlue"]
                  }
                >
                  <img src="askIcon.svg" />
                </div>
                <div>
                  <p>Demander un paiement</p>
                  <p>Réception sans contact ou via notification</p>
                </div>
              </div>
              <div className={styles.boxChoice}>
                <div
                  className={
                    styles["containerIcons"] + " " + styles["containerIconRed"]
                  }
                >
                  <img src="payIcon.svg" />
                </div>
                <div>
                  <p>Payer et Gagner du Cashback</p>
                  <p>Paiement via NFC ou QR-CODE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
