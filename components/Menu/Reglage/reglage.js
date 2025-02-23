import styles from "./reglage.module.css";
import { DataContext } from "../../Context";
import React, { useState, useEffect, useRef, useContext } from "react";

import { useForm } from "react-hook-form";

export default function Profile() {
  const { menu, setMenu, menuPage, setMenuPage } = useContext(DataContext);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const onSubmitProfile = (data) => {
    //console.log(data);
  };

  const onSubmitPassword = (data) => {
    //console.log(data);
  };
  //UPLOAD IMAGE

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };

  return (
    <>
      <div className={styles.ProfileBackground}>
        <div className={styles.ProfileContainer}>
          <div className={styles.Profile}>
            <div className={styles.ProfileHeader}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("home")}
              ></div>

              <p>{"Reglages"}</p>
              <div
                className={styles.arrowProfile}
                onClick={() => setMenuPage("home")}
              ></div>
            </div>

            <div className={styles.ProfileMain}>
              <h1>{"Edit"}</h1>

              <img src={createObjectURL} />
              <h2>{"AVATAR"}</h2>

              <input type="file" name="myImage" onChange={uploadToClient} />

              <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"Telephone"}</p>
                <input
                  className={styles.loginInput}
                  type="Telephone"
                  placeholder="00 2323 3233"
                  {...registerProfile("Phone", {
                    required: true,
                  })}
                />

                {errorsProfile.Phone && (
                  <span className={styles.formErrors}>
                    {"Entrez votre numéro de téléphone "}
                    <input
                      type="submit"
                      className={styles.loginButton}
                      value="Se connecter"
                      onSubmit={onSubmitLogin}
                    />
                  </span>
                )}

                <div className={styles.loginFormButtons}>
                  <input
                    type="submit"
                    className={styles.loginButton}
                    value="Se connecter"
                    // onSubmit={onSubmitLogin}
                  />
                </div>
              </form>

              <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <label className={styles.loginLabel}></label>
                <h2>{"Changer Mot de passe "}</h2>

                <i
                  className={styles.inputEye}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {/* {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />} */}
                </i>
                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="Entrez l'ancien mot de passe"
                  {...registerPassword("Old password", {
                    required: true,
                  })}
                />
                {errorsProfile.Oldpassword && (
                  <span className={styles.formErrors}>
                    {"Entrez l'ancien mot de passe"}
                  </span>
                )}

                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"nouveau mot de passe "}</p>

                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="Entrer votre nouveau mot de passe "
                  {...registerPassword("newPassword", {
                    required: true,
                  })}
                />
                {errorsProfile.newPassword && (
                  <span className={styles.formErrors}>
                    {"Entrer votre nouveau mot de passe "}
                  </span>
                )}

                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"confirmPassword"}</p>
                <i
                  className={styles.inputEye}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {/* {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />} */}
                </i>

                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="confirmer votre  nouveau mot de passe"
                  {...registerPassword("confirmPassword", {
                    required: true,
                  })}
                />
                {errorsProfile.RconfirmPassword && (
                  <span className={styles.formErrors}>
                    {"Entrez votre nouveau mot de passe"}
                  </span>
                )}

                <div className={styles.loginFormButtons}>
                  <input
                    type="submit"
                    className={styles.loginButton}
                    value="Save"
                  />
                </div>
                <button className={styles.loginSupprimerButton}>
                  Supprimer mon compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
