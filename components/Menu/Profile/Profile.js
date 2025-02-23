import styles from "./Profile.module.css";
import { DataContext } from "../../Context";
import React, { useState, useEffect, useRef, useContext } from "react";

import { useForm } from "react-hook-form";

export default function Profile() {
  const { menu, setMenu, menuPage, setMenuPage, availableModal,setAvailableModal } = useContext(DataContext);

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
    console.log(data);
  };

	    function NotAvailableModal() {
    setAvailableModal(true);
  }
  const onSubmitPassword = (data) => {
    console.log(data);
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

              <p>{"Mon Profil"}</p>

              <div
                className={styles.arrowProfile}
                onClick={() => setMenuPage("home")}
              ></div>
            </div>

            <div className={styles.ProfileMain}>
              <h1>{"Modifier"}</h1>

              <img src={createObjectURL} />
              <h2>{"AVATAR"}</h2>

              <input type="file" name="myImage" onChange={uploadToClient} />

              <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"Nom"}</p>
                <input
                  className={styles.loginInput}
                  type="Nom"
                  placeholder="Nom"
                  {...registerProfile("Nom", {
                    required: true,
                  })}
                />
                {errorsProfile.Firstname && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre Nom"}
                  </span>
                )}
                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"Prenom"}</p>
                <input
                  className={styles.loginInput}
                  type="Prenom"
                  placeholder="Prenom"
                  {...registerProfile("", {
                    required: true,
                  })}
                />
                {errorsProfile.Lastname && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre Prénom"}
                  </span>
                )}

                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"Telephone"}</p>
                <input
                  className={styles.loginInput}
                  type="Phone"
                  placeholder="00 2323 3233"
                  {...registerProfile("Phone", {
                    required: true,
                  })}
                />
			{errorsProfile.Phone && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre Numéro de téléphone"}
                  </span>
                )}

                <div className={styles.loginFormButtons} onClick={NotAvailableModal}>
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
                <h2>{"Changer mot de passe"}</h2>


                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="Enter ancien mot de passe"
                  {...registerPassword("Old password", {
                    required: true,
                  })}
                />
                {errorsProfile.Oldpassword && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre ancien mot de passe"}
                  </span>
                )}

                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"nouveau pot de passe"}</p>

                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="Entrer nouveau mot de passe"
                  {...registerPassword("newPassword", {
                    required: true,
                  })}
                />
                {errorsProfile.newPassword && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre nouveau mot de passe"}
                  </span>
                )}

                <label className={styles.loginLabel}></label>
                <p className={styles.loginlabel}>{"confirmer mot de passe"}</p>


                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="confirmPassword"
                  {...registerPassword("confirmPassword", {
                    required: true,
                  })}
                />
                {errorsProfile.RconfirmPassword && (
                  <span className={styles.formErrors}>
                    {"Merci de renseigner votre nouveau mot de passe"}
                  </span>
                )}

                <div className={styles.loginFormButtons}>
                  <input
                    type="submit"
                    className={styles.loginButton}
                    value="Save"
					onClick={NotAvailableModal}
                  />
                </div>
                <button className={styles.loginSupprimerButton} onClick={NotAvailableModal}>
                  Supprimer Mon Compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}