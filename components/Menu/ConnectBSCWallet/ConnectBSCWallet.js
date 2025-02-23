import styles from "./ConnectBSCWallet.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { useForm } from "react-hook-form";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import axios from "axios";
import variables from "../../../variables.json";
import SucessConnectBSC from "../SucessConnectBSC/SucessConnectBSC";
export default function ConnectBSCWallet() {
  const {
    menuPage,
    setMenuPage,
    amount,
    setAmount,
    menu,
    setMenu,
    setOpenConnectBSCWallet,
    BSCWallet,
    setBSCWallet,
  } = useContext(DataContext);

  const ref = useRef();
  const [key, setKey] = useState("");
  const [firstCheckBox, setFirstCheckBox] = useState(0);
  const [secondCheckBox, setSecondCheckBox] = useState(0);
  const [inputWarning, setInputWarning] = useState(false);
  const [checkBoxWarning, setCheckBoxWarning] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
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

  useEffect(() => {
    const getData = async () => {
      let getToken = getCookie("token");

      setToken(getToken);
    };

    getData();
    const backAction = () => {
      setOpenConnectBSCWallet(false);
      return true;
    };
    const handleBackPress = () => {
      backAction();
      return false;
    };

    window.addEventListener("beforeunload", backAction);
    window.addEventListener("popstate", handleBackPress);

    return () => {
      window.removeEventListener("beforeunload", backAction);
      window.removeEventListener("popstate", handleBackPress);
    };
  }, []);
  const onSubmit = () => {
    setInputWarning(false);
    setCheckBoxWarning(false);

    !key && setInputWarning(true);

    if (firstCheckBox == 0 || secondCheckBox == 0) {
      setCheckBoxWarning(true);
    }

    if (key && firstCheckBox == 1 && secondCheckBox == 1) {
      setSubmit(true);

      let newUserData = {
        BSCWallet: key,
      };

      axios
        .post(
          `${variables.DATA_URL}/user/update`,
          {
            token: token,
            newUserData: newUserData,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        )
        .then(async function (res) {
          if (res.status == 200) {
            let BSCAmount = axios.post(
              `${variables.DATA_URL}/user/getBSCBalance`,
              {
                token: token,
                BSCWallet: key,
              },
              {
                headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                },
              }
            );
            //console.log(BSCAmount);

            setBSCWallet(key);
            setMenuPage("sucessconnectbsc");
          }
        });
    }
  };
  return (
    <>
      <div className={styles.ConnectBSCWalletBackground}>
        <div className={styles.ConnectBSCWalletContainer}>
          <div className={styles.ConnectBSCWallet} ref={ref}>
            <div className={styles.header}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("home")}
              ></div>
              <p className={styles.titleHeader}>Importer</p>
            </div>
            <img className={styles.OZALogo} src="ozacoin.jpg" alt="OZALogo" />
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Importer mon solde</h1>
              <h2 className={styles.title}>OZACOIN (OZA)</h2>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Entrez votre clé publique BSC
              </label>
              <input
                className={styles.key}
                type="text"
                onChange={(e) => {
                  setKey(e.target.value);
                }}
                value={key}
                placeholder="X000 ..."
              />
            </div>

            <div>
              <div className={styles.checkBoxContainer}>
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  checked={firstCheckBox === 1}
                  onChange={() => setFirstCheckBox(firstCheckBox === 1 ? 0 : 1)}
                />
                <label className={styles.checkBoxText}>
                  <span>
                    J’atteste sur l’honneur être le proprietaire du portefeuille
                    $OZA renseigné ci-dessus.
                  </span>
                </label>
              </div>

              <div className={styles.checkBoxContainer}>
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  checked={secondCheckBox === 1}
                  onChange={() =>
                    setSecondCheckBox(secondCheckBox === 1 ? 0 : 1)
                  }
                />
                <label className={styles.checkBoxText} htmlFor="secondCheckBox">
                  <span>
                    Je comprends que la clé publique sera enregistrée et liée à
                    mon compte publique Ozalentour
                  </span>
                </label>
              </div>

              {inputWarning && (
                <p className={styles.warning}>
                  Veuillez renseigner la clé publique de de votre wallet BSC
                </p>
              )}

              {checkBoxWarning && (
                <p className={styles.warning}>Veuillez attester que vous êtes propriétaire du portefeuille, et que vous acceptez de lier la clé à votre compte Ozalentour</p>
              )}

              {submit ? (
                <div>
                  <h2>Chargement...</h2>
                </div>
              ) : (
                <div className={styles.touchable}>
                  <button className={styles.submit} onClick={onSubmit}>
                    <span className={styles.submitText}>Confirmer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
