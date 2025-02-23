import styles from "./Home.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { getCookie, removeCookies } from "cookies-next";
import axios from "axios";
import variables from "../../../variables.json";
import ConnectBSCWallet from "../ConnectBSCWallet/ConnectBSCWallet";
import Activite from "../Activite/Activite";
export default function Home() {
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
  const testClick = () => {
    setTest(true);
    setMenuComponent("activite");
  };

  useEffect(() => {
    const toggleMenu = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu

      if (
        menu &&
        !availableModal &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
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
        console.log(res);

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
      <div className={styles.menuBackground}>
        <div className={styles.menuContainer}>
          <div className={styles.menu} ref={ref}>
            <div className={styles.menuHeader}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenu(false)}
              ></div>
              <p className={styles.test}>{"Menu"} </p>
              
            </div>
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
                  <img src="shareIcon.svg" />
                </div>{" "}
              </div>
            </div>
            <div className={showDiv ? styles.hidden : styles.shown}>
              <div className={styles.menuOptions}>
                <div className={styles.backgroundDecoration}></div>
                {showWallet === 0 ? (
                  <div className={styles.walletContainer}>
                    <div className={styles.rowImage}>
                      <div className={styles.walletTopLeftRow}>
                        <img src="walletTotalIcon.svg" />
                        <p className={styles.wallet}>
                          {"Solde total de mon compte"}
                        </p>
                      </div>
                      <img src="eye.svg" />
                    </div>
                    <div className={styles.centerRow}>
                      <p className={styles.walletAmount}>{OZP}</p>
                      <p className={styles.euroText}>{"EUR"}</p>
                    </div>

                    <div className={styles.column}>
                      <p className={styles.centerx3}>dont 50,00 OZA</p>
                      <div
                        onClick={() => setMenuPage("transaction")}
                        className={styles.transfer}
                      >
                        <p>RECHARGER</p>
                        <img src="reload-icon.svg" />
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
                  >
                    <div className={styles.rowImage}>
                      <div className={styles.walletTopLeftRow}>
                        <img src="walletIconOZA.png" />
                        <p className={styles.wallet}>{"Mes OZACOINS"}</p>
                      </div>
                      <div className={styles.iconsWalletRight}>
                        <img
                          onClick={() => handleWallet(0)}
                          src="ozaCoinIcon.svg"
                        />
                        <img
                          onClick={() => handleWallet(0)}
                          src="eurOIcon.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.centerRow}></div>
                    <p className={styles.walletAmount}>
                      {BSCAmount || "0"} OZA
                    </p>
                    <div className={styles.column}>
                      {BSCAmount ? (
                        <p className={styles.centerx3}>
                          soit {parseFloat(BSCAmount) * 0.067}€
                        </p>
                      ) : (
                        <p>soit 0,00 Euro</p>
                      )}
                      <div className={styles.copy} onClick={copyToClipboard}>
                        <img src="copyIcon.png" />
                        {isCopied ? <p>Copié!</p> : <p>Copier mon adresse</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.menuNavigation}>
              <div className={styles.menuNavigationLink}>
                <div
                  className={
                    styles["containerIcon"] + " " + styles["containerIconBlue"]
                  }
                >
                  <img
                    className={styles.menuNavigationIcon}
                    src="promoteIcon.svg"
                    alt="wallet new icon"
                  />
                </div>
                <div className={styles.container}>
                  <div className={styles.col}>
                    <div className={styles.row}>
                      <p className={styles.titleMenuSubtitle}>
                        {"Espace Promotionnel"}
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p className={styles.bottomText}>
                        {"Activités et offres publiées"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles["col"] + " " + styles["col-right-center"]}
                  >
                    <div className={styles.row}>
                      <img
                        onClick={handleClick}
                        className={styles.chevron}
                        src="right.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={styles.menuNavigationLink}
                onClick={() => setMenuPage("annonces")}
              >
                <div
                  className={
                    styles["containerIcon"] + " " + styles["containerIconPink"]
                  }
                >
                  <img
                    className={styles.menuNavigationIcon}
                    src="handshakeIcon.svg"
                    alt="handshake"
                  />
                </div>
                <div className={styles.container}>
                  <div className={styles.col}>
                    <div className={styles.row}>
                      <p className={styles.titleMenuSubtitle}>
                        {"Recommandations"}
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p className={styles.bottomText}>
                        {"Avis et coups de coeurs"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles["col"] + " " + styles["col-right-center"]}
                  >
                    <div className={styles.row}>
                      <img
                        onClick={handleClick}
                        className={styles.chevron}
                        src="right.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {showDiv && (
                <div>
                  {menuComponent !== "activite" ? (
                    <div>
                      <div
                        onClick={testClick}
                        className={
                          styles["menuNavigationLink"] +
                          " " +
                          styles["menuNavigationLinkSublinks"]
                        }
                      >
                        <p>Mon activité</p>
                      </div>
                      <div
                        className={
                          styles["menuNavigationLink"] +
                          " " +
                          styles["menuNavigationLinkSublinks"]
                        }
                      >
                        <p>Mes offres</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.scrollBar}>
                      <div
                        onClick={testClick}
                        className={
                          styles["menuNavigationLink"] +
                          " " +
                          styles["menuNavigationLinkSublinks"]
                        }
                      >
                        <p>Mon activité</p>
                        <Activite />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div
                className={showDiv ? styles.hidden : styles.menuNavigationLink}
                onClick={() => setMenuPage("reward")}
              >
                <div
                  className={
                    styles["containerIcon"] +
                    " " +
                    styles["containerIconYellow"]
                  }
                >
                  <img
                    className={styles.menuNavigationIcon}
                    src="priceIcon.svg"
                    alt="gift"
                  />
                </div>
                <div className={styles.container}>
                  <div className={styles.col}>
                    <div className={styles.row}>
                      <p className={styles.titleMenuSubtitle}>
                        {"Récompenses"}
                      </p>
                    </div>
                    <div>
                      <p className={styles.bottomText}>
                        {"Primes et affiliés"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles["col"] + " " + styles["col-right-center"]}
                  >
                    <div className={styles.row}>
                      <img className={styles.chevron} src="right.svg" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={showDiv ? styles.hidden : styles.menuNavigationLink}
                onClick={() => setMenuPage("setting")}
              >
                <div
                  className={
                    styles["containerIcon"] +
                    " " +
                    styles["containerIconGreyClear"]
                  }
                >
                  <img
                    className={
                      styles["menuNavigationIcon"] +
                      " " +
                      styles["menuNavigationIconTooBig"]
                    }
                    src="settingIcon.svg"
                    alt="reglages"
                  />
                </div>
                <div className={styles.container}>
                  <div className={styles.col}>
                    <div className={styles.row}>
                      <p className={styles.titleMenuSubtitle}>{"Paramètres"}</p>
                    </div>
                    <div>
                      <p className={styles.bottomText}>
                        {"Réglages et confidentialité"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles["col"] + " " + styles["col-right-center"]}
                  >
                    <div className={styles.row}>
                      <img className={styles.chevron} src="right.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={showDiv ? styles.hidden : styles.menuNavigationLink}
                onClick={logOut}
              >
                <div
                  className={
                    styles["containerIcon"] +
                    " " +
                    styles["containerIconGreyHard"]
                  }
                >
                  <img
                    className={styles.menuNavigationIcon}
                    src="powerbuttonIcon.svg"
                    alt="logout"
                  />
                </div>
                <div className={styles.container}>
                  <div className={styles.col}>
                    <div className={styles.row}>
                      <p className={styles.titleMenuSubtitle}>
                        {"Se Déconnecter"}
                      </p>
                    </div>
                    <div>
                      <p className={styles.bottomText}>
                        {"Quitter Ozalentour"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles["col"] + " " + styles["col-right-center"]}
                  >
                    <div className={styles.row}>
                      <img className={styles.chevron} src="right.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottomContent}>
              <div className={styles.toWinOza}>
                <p>GAGNEZ DES</p>
                <span>OZA</span>
                <span>(stocks dégressifs)</span>
              </div>
              <div className={styles.toWinOzaItems}>
                <img src="ozacoin.jpg" />
                <span>+200 OZA</span>
                <p>pour chaque relation invitée</p>
              </div>
              <div className={styles.toWinOzaItems}>
                <img src="ozacoin.jpg" />
                <span>+250 OZA</span>
                <p>pour toute promotion</p>
              </div>
              <div className={styles.toWinOzaItems}>
                <img src="ozacoin.jpg" />
                <span>+300 OZA</span>
                <p>pour tout rechargement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
