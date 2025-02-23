import styles from "./NotAvailableModal.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HiX } from "react-icons/hi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext, useEffect, useRef, menu, setMenu } from "react";
import { DataContext } from "../../Context";
import { setCookies, getCookie, getCookies } from "cookies-next";

import "react-phone-input-2/lib/style.css";
import Home from "../../../pages";

export default function NotAvailableModal() {
  const { availableModal, setAvailableModal } = useContext(DataContext);

  const {
    register: registerUserInfos,
    handleSubmit: handleSubmitRegisterUserInfos,
    formState: { errors: errorsRegisterUserInfos },
    watch,
  } = useForm();

  const ref = useRef();

  useEffect(() => {
    document.body.style.overflow = availableModal ? "hidden" : "scroll";
  }, [availableModal]);

  useEffect(() => {
    const toggleNotAvailableModal = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (availableModal && ref.current && !ref.current.contains(e.target)) {
        setAvailableModal(false);
      }
    };

    document.addEventListener("mousedown", toggleNotAvailableModal);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", toggleNotAvailableModal);
    };
  }, [availableModal]);

  return (
    <>
      {availableModal ? (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer} ref={ref}>
            <div className={styles.modalMessage}>
              <h1>
                {
                  "Cette fonctionnalité sera prochainement disponible ! Patience  :)"
                }
              </h1>
			</div>
              <div className={styles.modalPicture}>
                <img src="people-4.jpg" alt="people-4"></img>
              </div>
            
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
}