import styles from "./LostPasswordModal.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HiX } from "react-icons/hi";
import { ImSpinner9 } from "react-icons/im";
import { DataContext } from "../../Context";
import { useState, useContext, useEffect } from "react";
import variables  from "../../../variables.json";


export default function LostPasswordModal() {
  const [resetClicked, setResetClicked] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const {
    loginModal,
    setLoginModal,
    lostPasswordModal,
    setLostPasswordModal,
    token,
    setToken,
    userData,
    setUserData,
	showModal,
	setShowModal,
  } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors: errorsLogin },
  } = useForm();

  // We get user email and password from the login form and perform a request to obtain a json web token
  const handleSubmitLostPassword = (data) => {
    setResetClicked(true);
    //console.log(data);
    axios
      .post(
        `${variables.DATA_URL}/user/resetPasswordLink`,
        {
          email: data.email,
		  language:"fr",
        },
        {
          //withCredentials: true,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(() => {
        setMailSent(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return lostPasswordModal ? (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.modalLeft}>
            <img src="ozaLogo.png" alt="logo" />
            <h3>{"Récupération de votre compte Ozalentour"}</h3>
            <p>
              {
                "Vous avez perdu votre mot de passe ? Renseignez votre adresse e-mail ci-dessous."
              }
            </p>

            <form onSubmit={handleSubmit(handleSubmitLostPassword)}>
              <div className={styles.fullInput}>
                <label className={styles.loginLabel}>
                  {"ADRESSE EMAIL"}</label>
                  <input
                    className={styles.loginInput}
                    type="email"
                    placeholder="adresse@fai.com"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                
                {errorsLogin.email && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre adresse email"}
                  </span>
                )}
              </div>
              {resetClicked ? (
                <>
                  {mailSent ? (
                    <p className={styles.confirmation}>
                      {" "}
                      {"Un email de récupération vous a été envoyé"}
                    </p>
                  ) : (
                    <div className={styles.loader} />
                  )}
                </>
              ) : (
                <input
                  type="submit"
                  className={styles.resetButton}
                  value="Réinitialiser"
                />
              )}
            </form>

            <p>
              {"Vous avez retrouvé votre mot de passe ?"}{" "}
              <span
                className={styles.loginButton}
                onClick={() => {
                  setLostPasswordModal(false),setLoginModal(1),setShowModal("login");
                }}
              >
                {"Se connecter"}
              </span>{" "}
            </p>
          </div>
          <div className={styles.modalRight}>
            <HiX
              className={styles.closeModal}
              onClick={() => {
                setLostPasswordModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
}
