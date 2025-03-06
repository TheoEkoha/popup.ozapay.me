import styles from "./Header.module.css";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../Context";
import Link from "next/link";
import { getCookie } from "cookies-next";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

export default function Header({ children }) {
  const {
    availableModal,
    setAvailableModal,
    loginModal,
    setLoginModal,
    menu,
    setMenu,
  } = useContext(DataContext);

  const [flags, setFlags] = useState(false);
  const [flag, setFlag] = useState(0);

  const { t, i18n } = useTranslation("en", { useSuspense: false });

  const handleLangChangeEN = (event, languageCode) => {
    setFlag(1);
	const test = i18n.changeLanguage(languageCode);
	console.log(test);
  };
  const handleLangChangeFR = (event, languageCode) => {
	
    setFlag(0);
	const test = i18n.changeLanguage(languageCode);
	console.log(test);
  };

  let token = getCookie("token");
  function NotAvailableModal() {
    setAvailableModal(true);
  }

  function openModal() {
    setLoginModal(1);
  }

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <a  href="https://fr.ozapay.me/">
            <img src="/ozaLogo.png" alt="logo" />
          </a>
        </div>
        <div className={styles.navigation}>
			{/* <div className={styles.mainMenu}>
			  <p>
              <img
                onClick={NotAvailableModal}
                className={styles.navIconSpecial}
                src="/explorer.png"
                alt="explorer"
              />
              EXPLORATEUR
            </p>
			
            <p>
              <img
                onClick={NotAvailableModal}
                className={styles.navIconSpecial}
                src="/community-white.png"
                alt="news"
              />
              FIL D'ACTUALITÉS
            </p>
			*/}

{/* <img
              onClick={NotAvailableModal}
              className={styles.navIcon}
              src="/search.png"
              alt="search"
            />

            <img
              onClick={NotAvailableModal}
              className={styles.navIcon}
              src="/cart.png"
              alt="cart"
            />
            <img
              onClick={NotAvailableModal}
              className={styles.navIcon}
              src="/alert.png"
              alt="alert"
            />
          </div>*/}
		  <div className={styles.linkToFooter}>
		  	<Link href="#footer">?</Link>
		  </div>
          <div
            className={styles.HeaderFlag}
            onClick={() => {
              setFlags(!flags);
            }
}
          >
            <img className={styles.navIcone} src="/flagf.jpg" alt="flag2" />

           
            {flags ? (
              <div
                className={token ? styles.FlagContentLog : styles.FlagContent}
              >
                <ul className={styles.liste}>
                  <li className={styles.listeFlag}>
                    <Link href="https://en.ozalentour.com/">
                      {
                        <img
                          className={styles.navIcone}
                          src="/flagA.jpg"
                          alt="flag"
                        />
                      }
                    </Link>
                  </li>
                  <li className={styles.listeFlag}>
                    <Link href="https://esp.ozalentour.com/">
                      {
                        <img
                          className={styles.navIcone}
                          src="/flage.jpg"
                          alt="flag"
                        />
                      }
                    </Link>
                  </li>
				 <li className={styles.listeFlag}>
                    <Link href="https://de.ozalentour.com/">
                      {
                        <img
                          className={styles.navIcone}
                          src="/flagd.jpg"
                          alt="flag"
                        />
                      }
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>


          {!token ? (
            <>
              <img
                className={styles.usernotConnected}
                onClick={openModal}
                src="/user.png"
              />
              <button className={styles.loginButton} onClick={openModal}>
                <img
                  className={styles.userCircle}
                  onClick={openModal}
                  src="/user.png"
                />
                Se Connecter
              </button>
            </>
          ) : (
            <>
              <div>
                <img
                  className={styles.userConnectedD}
                  onClick={toggleMenu}
                  src="/profile.png"
                />
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </>
  );
}

