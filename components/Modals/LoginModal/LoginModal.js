import stylesHome from "../../../styles/Index.module.css"
import styles from "./LoginModal.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext, useEffect, useRef } from "react";
import { DataContext } from "../../Context";
import { setCookies, getCookie, getCookies } from "cookies-next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import variables from "../../../variables.json";
import { useTranslation } from "react-i18next";
import SecretCodeInput from "./SecretCodeInput";
export default function LoginModal({isOpenRest}) {
  const {
    loginModal,
    setLoginModal,
    lostPasswordModal,
    setLostPasswordModal,
    token,
    setToken,
    userData,
    setUserData,
    setWalletId,
    availableModal,
    setAvailableModal,
    isFromLandingPage,
    isOpenReset
  } = useContext(DataContext);
  const { t, i18n } = useTranslation("fr", { useSuspense: false });
  useEffect(() => {
    document.body.style.overflow = loginModal ? "hidden" : "scroll";
    const bottomCountDownElt = document.getElementById('eapps-countdown-timer-1');
    /**
     * we need to hidden countdown 'cause its break the responsive view when modal opened
     */
    if (bottomCountDownElt) {
      bottomCountDownElt.style.display = loginModal ? "none" : "block"
    }
  }, [loginModal]);
  useEffect(() => {
    //setFormStep(6)
    setFormStep(isFromLandingPage ? 3 : 0)
  }, [isFromLandingPage])

  const recaptchaRef = useRef(null);
  const [formStep, setFormStep] = useState(0); // initial state 0 but need be 3 because need to fit with landing page changes
  const [registerData, setRegisterData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginPicture, setLoginPicture] = useState(false);
  const [showModal, setShowModal] = useState("login");
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phone, setPhone] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showCodeMailError, setShowCodeMailError] = useState(false);
  const [showCodePhoneError, setShowCodePhoneError] = useState(false);
  const [showCodeError, setShowCodeError] = useState(false);
  const [typeAccount, setTypeAccount] = useState("");
  const [showText, setShowText] = useState(0);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [finalPart, setFinalPart] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [sucessCodeEmail, setSucessCodeEmail] = useState(false);
  const [sucessCodePhone, setSucessCodePhone] = useState(false);
  const [sucessCodeEmailEntered, setSucessCodeEmailEntered] = useState(false);
  const [sucessCodePhoneEntered, setSucessCodePhoneEntered] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [noButtonMail, setNoButtonMail] = useState(false);
  const [noButtonPhone, setNoButtonPhone] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isLoadCreateUser, setIsLoadCreateUser] = useState(false)
  const [isLoadUpdatePwd, setIsLoadUpdatePwd] = useState(false)
  const [currentCreatedUserID, setCurrentCreatedUserID] = useState();
  const [emailResponseError, setEmailResponseError] = useState()
  const [phoneResponseError, setPhoneResponseError] = useState()
  const [isAcceptedCondition, setIsAcceptedCondition] = useState(false)
  const [isAcceptedLastPromotion, setIsAcceptedLastPromotion] = useState(false)
  const [isInConditionSectionDone, setIsInConditionSectionDone] = useState(false)
  const [isSMSSend, setIsSMSSend] = useState(false)
  const [isPhoneCodeValid, setIsPhoneCodeValid] = useState(false)
  const [isLoadCheckCode, setIsLoadCheckCode] = useState(false)
  const [isEmailSend, setIsEmailSend] = useState(false)
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false)
  const [isLoadCreateSecurityCode, setIsLoadCreateSecurityCode] = useState(false)
  const [createPwdErrorMsg, setCreatePwdErrorMsg] = useState()
  const [newPwd, setNewPwd] = useState('')
  const [confirmNewPwd, setConfirmNewPwd] = useState()
  const [isSecret, setIsSecret] = useState(false)
  const [isValidPwd, setIsValidPwd] = useState(false)
  const [affiliateCode, setAffiliateCode] = useState()
  const [isFromLogin, setIsFromLogin] = useState(false)
  const [expriredPwdErr, setExpriredPwdErr] = useState(false)
  const [textResendMail, setTextResendMail] = useState(false)
  const [textResendPhone, setTextResendPhone] = useState(false)

  useEffect(() => {
    if (isOpenReset) {
      setFormStep(7)
    }
  }, [isOpenReset]);
  useEffect(() => {
    setTimeout(() => {
      setShowCodeMailError(false);
    }, 8000);
  }, [showCodeMailError]);

  useEffect(() => {
    setTimeout(() => {
      setShowCodePhoneError(false);
    }, 8000);
  }, [showCodePhoneError]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (noButtonMail && seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        clearInterval(interval);
        // Add your code to execute when the counter reaches 0 here.
        setNoButtonMail(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [noButtonMail, seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (noButtonPhone && seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        clearInterval(interval);
        // Add your code to execute when the counter reaches 0 here.
        setNoButtonPhone(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [noButtonPhone, seconds]);

  const handlePhoneDigit = (value, dialCode) => {
    let userInput = value.slice(dialCode.length)
    if (userInput[0] === "0") {
      userInput = userInput.slice(1)
    }
    setPhone(dialCode + userInput)
  }

  const handleCondition = () => {
    if (typeAccount === "professionel") {
      localStorage.setItem("pro", typeAccount);
      localStorage.removeItem("particular", typeAccount);
      // setFormStep(1);
    }
    if (typeAccount === "particulier") {
      localStorage.setItem("particular", typeAccount);
      localStorage.removeItem("pro", typeAccount);
      // setFormStep(2);
    }
    if (typeAccount) {
      setIsInConditionSectionDone(true)
    }
  }

  useEffect(() => {
    setIsValidPwd(newPwd.length === 6)
  }, [newPwd])

  // Config for forms using React-hook-form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitRegisterEmail,
    formState: { errors: errorsRegisterEmail },
  } = useForm();

  const {
    register: registerEmailCode,
    handleSubmit: handleSubmitRegisterEmailCode,
    formState: { errors: errorsRegisterEmailCode },
  } = useForm();

  const {
    register: registerPhone,
    handleSubmit: handleSubmitRegisterPhone,
    formState: { errors: errorsRegisterPhone },
  } = useForm();

  const {
    register: registerPhoneCode,
    handleSubmit: handleSubmitRegisterPhoneCode,
    formState: { errors: errorsRegisterPhoneCode },
  } = useForm();

  const {
    register: registerUserInfos,
    handleSubmit: handleSubmitRegisterUserInfos,
    formState: { errors: errorsRegisterUserInfos },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitRegisterPassword,
    formState: { errors: errorsRegisterPassword },
    watch,
  } = useForm();
  const {
    register: registerNewPassword,
    handleSubmit: handleSubmitNewPassword,
    formState: { errors: errorsLoginNewPassword },
  } = useForm();
  function NotAvailableModal() {
    setAvailableModal(true);
  }
  const interestText = {
    1: "Portemonnaie multidevises",
    2: "Compte IBAN + CB",
    3: "Portefeuille crypto sans détention",
    4: "Bons Plans & Cashback",
    5: "Gérer / Vendre plus facilement",
    6: "Devenir Ambassadeur",
    7: "Gagner du temps en une seule app",
  };

  const handleInterestClick = (interestNumber) => {
    setSelectedInterest(interestNumber);
    const interest = interestText[interestNumber];
    const test = localStorage.setItem("interest", interest);
    console.log(test);
  };

  // We get user email and password from the login form and perform a request to obtain a json web token
  const onSubmitLogin = (data1) => {
    let data = {
      email: data1.email,
      password: data1.password,
    };
    setShowPasswordError(false);
    axios
      .post(
        `${variables.API_URL}/login_check`,
        {
          ...data,
        },
        {
          //withCredentials: true,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(function (resultat) {
        let llogintoken = resultat.data.token;
        if (llogintoken) {
          // location.href = "https://popupfr.ozapay.me/"
          setFormStep(6)
          setIsFromLogin(true)
        }
        // let loginToken = setCookies("token", llogintoken);

        // axios
        //   .post(
        //     `${variables.DATA_URL}/user/getData`,
        //     {
        //       token: llogintoken,
        //     },
        //     {
        //       //withCredentials: true,
        //       headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //       },
        //     }
        //   )
        //   .then(function (response) {
        //     setCookies("EUR", response.data.EUR.toString());
        //     setCookies("firstName", response.data.firstName);
        //     setCookies("lastName", response.data.lastName);
        //     setCookies("walletId", response.data.walletId);
        //     setCookies("BSCWallet", response.data.BSCWallet);

        //     setToken(true);
        //     setWalletId(response.data.walletId);
        //     setLoginModal(0);
        //     setFormStep(0);
        //   })
        //   .catch(function (error) {
        //     setShowCodeError(true);
        //   });
      })
      .catch(function (error) {
        if (error.response.data.message === "USER_PASSWORD_NOT_CHANGED") {
          setExpriredPwdErr(true)
        } else {
          setShowPasswordError(true);
        }
      });
  };

  // We handle form datas and update the registerData state with it. Then, we change the formStep number to display the next part of the register tunnel
  const onSubmitRegisterEmail = async (data1) => {
    let email = data1.registerEmail;

    setRegisterData({ email: email });

    let data = {
      email: email,
      for: "SIGN_UP_VER",
    };
    setEmailResponseError('')

      const handleAxiosError = (error) => {
        if (error.response?.data?.detail === "EMAIL_ALREADY_EXIST") {
          setEmailResponseError('L\'email existe déjà')
        } else {
          setPhoneResponseError("Une erreur est survenue.");
        }
      };

      try {
        await axios.patch(
            `${variables.API_URL}/user/${currentCreatedUserID}`,
            { ...data,},
            { headers: { "Content-Type": "application/merge-patch+json" } }
        );

        localStorage.setItem("email", JSON.stringify(data.email));
        // setSucessCodeEmail(true);
        setNoButtonMail(true);
        setIsEmailSend(true)
        setSeconds(60)
      } catch (error) {
        handleAxiosError(error);
      }
  };

  const onSubmitResendEmail = async () => {
    setEmailResponseError('')

    try {
      await axios.post(
          `${variables.API_URL}/user/code/resend/${currentCreatedUserID}`,
          { type: "MAIL", for: "SIGN_UP_VER" },
          { headers: { "Content-Type": "application/json" } }
      );

      // setNoButtonMail(true);
      // setIsEmailSend(true)
      setSeconds(60)
      setTextResendMail(true)
    } catch (error) {
      setPhoneResponseError("Une erreur est survenue.");
    }
  };


  const handleButtonClick = () => {
    if (isAcceptedCondition && isAcceptedLastPromotion) {
      if (typeAccount === "professionel") {
        // localStorage.setItem("pro", typeAccount);
        // localStorage.removeItem("particular", typeAccount);
        setFormStep(1);
      }
      if (typeAccount === "particulier") {
        // localStorage.setItem("particular", typeAccount);
        // localStorage.removeItem("pro", typeAccount);
        setFormStep(2);
      }
    }
  };
  const handleButtonClickReturn0 = (e) => {
    setFormStep(0);
  };
  const handleButtonClickReturn = (e) => {
    e.preventDefault();
    if (localStorage.getItem("pro")) {
      setFormStep(1);
    }
    if (localStorage.getItem("particular")) {
      setFormStep(2);
    }
  };
  useEffect(() => {
    if (emailCode && emailCode.length === 6) {
      let visitorData = registerData.email;

      let visitorCode = emailCode;
      let data = {
        visitorData,
        visitorCode,
      };
      setIsLoadCheckCode(true)
      axios
        .post(
          `${variables.API_URL}/user/verify/${currentCreatedUserID}`,
          {
            code: emailCode,
            type: "MAIL",
            for: "SIGN_UP_VER"
          },
          {
            //withCredentials: true,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        )
        .then(function (response) {
          setIsLoadCheckCode(false)
          setTextResendMail(false);
          setSucessCodeEmailEntered(true);
        });
    }
  }, [emailCode]);
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const onSubmitRegisterPhone = async (data1) => {
    setSeconds(60)
    let phoneNumber = `+${phone}`;

    let indicatif = phoneNumber.substr(0, 4);
    setPhoneResponseError('')
    setRegisterData(() => ({ ...registerData, phoneNumber }));

    // Verified if indicatifs are allowed
    const allowedIndicatifs = ["+225", "+234", "+241", "+229"];
    if (!allowedIndicatifs.includes(indicatif)) {
      const handleAxiosError = (error) => {
        if (error.response?.data?.detail === "PHONE_ALREADY_EXIST") {
          setPhoneResponseError("Ce numéro existe déjà.");
        } else {
          setPhoneResponseError("Une erreur est survenue.");
        }
      };

      try {
        await axios.patch(
            `${variables.API_URL}/user/${currentCreatedUserID}`,
            { phone: phoneNumber, for: "SIGN_UP_VER" },
            { headers: { "Content-Type": "application/merge-patch+json" } }
        );

        localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));
        setNoButtonPhone(true);
        setIsSMSSend(true);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };

  const onSubmitResendCodeSMS = async () => {
    let phoneNumber = `+${phone}`;
    setPhoneResponseError('')
    setRegisterData(() => ({ ...registerData, phoneNumber }));

      try {
        await axios.post(
            `${variables.API_URL}/user/code/resend/${currentCreatedUserID}`,
            { type: "SMS", for: "SIGN_UP_VER", appSignature:"" },
            { headers: { "Content-Type": "application/json" } }
        );

        setSeconds(60)
        setTextResendPhone(true)
        // setNoButtonPhone(true);
        // setIsSMSSend(true);
      } catch (error) {
        setPhoneResponseError("Une erreur est survenue.");
      }
    console.log('resend SMS')
  };

  useEffect(() => {
    if (phoneCode && phoneCode.length === 6) {
      let visitorData = registerData.phoneNumber;
      let visitorCode = phoneCode;
      let data = {
        visitorData,
        visitorCode,
      };
      setIsLoadCheckCode(true)
      axios
        .post(
          `${variables.API_URL}/user/verify/${currentCreatedUserID}`,
          {
            code: phoneCode,
            type: "SMS",
            for: "SIGN_UP_VER"
          },
          {
            //withCredentials: true,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        )
        .then(function (response) {
          setIsLoadCheckCode(false)
          setIsPhoneCodeValid(true);
        });
    }
  }, [phoneCode]);

  const onSubmitRegisterUserInfos = async (infos, e) => {
    e.preventDefault();
    let firstName = infos.firstName;
    let lastName = infos.lastName;
    let postalCode = infos.postalCode;
    let city = infos.city;
    let siret = infos.siret;
    let denomination = infos.denomination;
    let firstAddress = infos.firstAddress;
    let secondAddress = infos.secondAddress;

    localStorage.setItem("firstName", JSON.stringify(firstName));
    localStorage.setItem("lastName", JSON.stringify(lastName));
    localStorage.setItem("postalCode", JSON.stringify(postalCode));
    localStorage.setItem("city", JSON.stringify(city));
    localStorage.setItem("siret", JSON.stringify(siret));
    localStorage.setItem("denomination", JSON.stringify(denomination));
    localStorage.setItem("firstAddress", JSON.stringify(firstAddress));
    localStorage.setItem("secondAddress", JSON.stringify(secondAddress));
    function generateRandomNumbers() {
      const numbers = [];
      for (let i = 0; i < 6; i++) {
        const randomNum = Math.floor(Math.random() * 10); // Generates a number between 0-9
        numbers.push(randomNum);
      }
      return numbers.join('');
    }
    try {
      setIsLoadCreateUser(true)
      let payload = {
        firstName,
        lastName,
        address: firstAddress,
        code: affiliateCode || "",
      };
      if (localStorage.getItem("pro")) {
        payload = {...payload, denomination, siret, role: "professional"}
      } else if (localStorage.getItem("particular")) {
        payload = {...payload, city, postalCode, role: "particular"}
      }
      const res = await axios.post(`${variables.API_URL}/users`, {
        ...payload
      })
      setCurrentCreatedUserID(res.data.id)
      setFormStep(4);
    } catch (error) {
      console.log(error, "Error occured")
    } finally {
      setIsLoadCreateUser(false)
    }
  };
  const handleButtonClick3 = () => {
    if (sucessCodePhoneEntered === true && sucessCodeEmailEntered === true) {
      setFormStep(5);
    } else {
      console.log("faux");
    }
  };
  const handleNewPwd = () => {
    setCreatePwdErrorMsg('')
    if (newPwd.length !== 6) {
      setCreatePwdErrorMsg("Code non valide")
    } else {
      setIsPasswordValid(true)
    }
  }

  const onSubmitPassword = async (infos) => {

    setCreatePwdErrorMsg("")
    if (newPwd !== confirmNewPwd) {
      setCreatePwdErrorMsg("Le code ne correspond pas")
    } else {
      setIsLoadCreateSecurityCode(true)
      const hashedPassword = newPwd;
      // setIsLoadUpdatePwd(true)
      axios
        .patch(
          `${variables.API_URL}/user/${currentCreatedUserID}`,
          {
            pin: hashedPassword,
            _step: "pin"
          },
          {
            headers: {
              "Content-Type": "application/merge-patch+json",
            },
          }
        )
        .then(function () {
            localStorage.setItem("password", hashedPassword);
            // setIsLoadUpdatePwd(false)
            setFormStep(6);
            // setRegisterSuccess(true);
            // setLoginModal(2);
            setIsSecret(false);
          })
        .catch(() => {
          setCreatePwdErrorMsg("Une erreur est survenue")
        })
        .finally(() => {
          setIsLoadCreateSecurityCode(false)
        })
    }
  };
  const createUser = async (infos) => {
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let postalCode = localStorage.getItem("postalCode");
    let city = localStorage.getItem("city");
    let siret = localStorage.getItem("siret");
    let denomination = localStorage.getItem("denomination");
    let firstAddress = localStorage.getItem("firstAddress");
    let secondAddress = localStorage.getItem("secondAddress");
    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");
    let phoneNumber = localStorage.getItem("phoneNumber");
    let interest = localStorage.getItem("interest");

    // axios
    //   .post(
    //     `${variables.DATA_URL}/register/createUser`,
    //     {
    //       firstName: firstName,
    //       lastName: lastName,
    //       postalCode: postalCode,
    //       city: city,
    //       siret: siret,
    //       denomination: denomination,
    //       firstAddress: firstAddress,
    //       secondAddress: secondAddress,
    //       password: password,
    //       email: email,
    //       phoneNumber: phoneNumber,
    //       langue: "fr",
    //       interest: interest,
    //       typeAccount: typeAccount,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     }
    //   )
    //   .then(function (response) {
      //     setLoginModal(2);
      //   })
      //   .catch(function (error) {});
      setLoginModal(1);
      setFormStep(0);

  };

  const handleSelectChange = (event) => {
    setTypeAccount(event.target.value);
  };

  const handleButtonClickReturn2 = (e) => {
    e.preventDefault();

    setFormStep(2);
  };

  const handleButtonClickReturn3 = (e) => {
    e.preventDefault();

    setFormStep(3);
  };
  const handleButtonClickReturn4 = (e) => {
    setIsValidPwd(false);
    setFormStep(4);
  };
  const handleButtonClickReturn6 = (e) => {
    setFormStep(5);
  };
  const handleButtonClickForgot = (e) => {
    setFormStep(7);
  };
  // We get user email and password from the login form and perform a request to obtain a json web token
  const onSubmitNewPassword = (data) => {
    setResetClicked(true);
    axios
      .post(
        `${variables.API_URL}/user/forgot`,
        {
          email: data.email,
          url: window.location.origin + "/resetPassword",
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
  const onlyLettersRegex = /^[A-Za-z]+$/; // regular expression pattern to match only letters
  return (
    <>
      {/* ----------------------------------------------------------------------------------------
    *************************************** LOGIN ************************************************
    ------------------------------------------------------------------------------------------ */}
      {loginModal === 1 ? (
        <div className={styles.modalBackground}>
          {formStep == 0 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Connectez-vous dès maintenant et essayez notre Super App Ozapay !</h2>
                  <p>
                    Accédez à notre version Alpha Test Ozapay, précommandez votre abonnement et découvrez nos premières fonctionnalités comme la gestion de votre portefeuille cryptos sous votre propre garde !
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(3);
                    }}
                  >
                    Créer un compte
                  </p>
                </div>
              </div>
              <div
                className={styles["modalLeft"] + " " + styles["modalLeftLogin"]}
              >
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <h2>Se Connecter</h2>
                <p className={styles.toConnect}>
                  Connectez-vous et Profitez en avant première de nos
                  incroyables services !
                </p>
                <form
                  className={styles.formContainer}
                  onSubmit={handleSubmitLogin(onSubmitLogin)}
                >
                  <label>Adresse Email</label>
                  <div>
                    <input
                      className={styles.inputLogin}
                      placeholder={"Entrez votre email"}
                      {...registerLogin("email", {
                        required: true,
                      })}
                    />
                    {errorsLogin.email && (
                      <div className={styles.formErrorsContainer}>
                        <span className={styles.formErrorsLogin}>
                          Merci de renseigner votre adresse email
                        </span>
                      </div>
                    )}
                  </div>
                  <label>Mot de passe</label>
                  <div>
                    <input
                      className={styles.inputLogin}
                      placeholder={"Entrez votre mot de passe"}
                      {...registerLogin("password", {
                        required: true,
                      })}
                      type="password"
                    />
                    {errorsLogin.password && (
                      <div
                        className={
                          styles["formErrorsContainer"] +
                          " " +
                          styles["formErrorsContainerPassword"]
                        }
                      >
                        {/* <span className={styles.formErrorsLogin}>
                          Merci de renseigner votre mot de passe. Celui-ci doit
                          faire au minimum 12 caractères avec une majuscule, une
                          minuscule, un chiffre et un caractère spéciale
                        </span> */}
                        <span className={styles.formErrorsLogin}>
                          Merci de renseigner votre mot de passe
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.password}>
                    <p onClick={handleButtonClickForgot}>
                      Mot de passe oublié ?
                    </p>
                  </div>

                  <div className={styles.buttonLogin}>
                    <input type="submit" value="Se Connecter" />
                  </div>
                  {showPasswordError ? (
                    <span className={styles.formErrorsLoginFinal}>
                      L'adresse email ou le mot de passe saisie est incorrect
                    </span>
                  ) : null}
                  {expriredPwdErr && 
                    <div>
                      <span style={{marginTop: '70px'}} className={styles.formErrorsLoginFinal}>
                        Votre mot de passe a expiré et doit être changé
                      </span>
                      <div style={{marginTop: "20px"}} className={styles.buttonLogin}>
                        <input type="button" onClick={handleButtonClickForgot} value="Changer mon mot de passe" />
                      </div>
                    </div>
                  }
                </form>
              </div>
            </div>
          ) : formStep === 1 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Bientôt disponible, profitez bientôt d'un compte IBAN compatible en plus de vos cryptomonnaies !</h2>
                  <p>
					Des cryptos c'est bien, mais un compte EURO-CRYPTO, c'est encore mieux ! Actuellement en cours de développement, profitez prochainement d'un compte courant multidevise !
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous souhaitez nous rejoindre ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(3);
                    }}
                  >
                    Créer un compte
                  </p>
                </div>
              </div>
              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <p className={styles.step}>Étape 2 sur 9</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressSecondStep}></div>
                </div>
                <h2>Informations personnelles</h2>
                <form
                  className={styles.formContainer}
                  onSubmit={handleSubmitRegisterUserInfos(
                    onSubmitRegisterUserInfos
                  )}
                >
                  <div>
                    <p className={styles.pro}>
                      {"J'agis pour le compte d'une entreprise"}
                    </p>
                    <div
                      className={
                        styles["fullInput"] + " " + styles["fullInputSpecial"]
                      }
                    >
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"]
                            }
                            placeholder={"Dénomination"}
                            {...registerUserInfos("denomination", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.denomination && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre dénomination
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>

                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={styles.inputUserInfos}
                            placeholder={"SIRET"}
                            {...registerUserInfos("siret", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.siret && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre siret
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.fullInput}>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"]
                            }
                            placeholder={"Nom du titulaire du compte"}
                            {...registerUserInfos("lastName", {
                              required: true,
                              pattern: onlyLettersRegex, // validation rule to allow only letters
                            })}
                          />
                          {errorsRegisterUserInfos.lastName && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre nom
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>

                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={styles.inputUserInfos}
                            placeholder={"Prénom"}
                            {...registerUserInfos("firstName", {
                              required: true,
                              pattern: onlyLettersRegex, // validation rule to allow only letters
                            })}
                          />
                          {errorsRegisterUserInfos.firstName && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre prénom
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.fullInput}>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"]
                            }
                            placeholder={"Adresse"}
                            {...registerUserInfos("firstAddress", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.firstAddress && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre adresse
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>

                      <div className={styles.oneInput}>
                        <input
                          className={
                            styles["inputUserInfos"] +
                            " " +
                            styles["inputMargin"]
                          }
                          placeholder={"Adresse 2"}
                          {...registerUserInfos("secondAddress", {})}
                        />
                      </div>
                    </div>
                    <div className={styles.fullInput}>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"] +
                              " " +
                              styles["inputMargin"]
                            }
                            placeholder={"Code Postal"}
                            {...registerUserInfos("postalCode", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.postalCode && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre code postal
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={styles.inputUserInfos}
                            placeholder={"Ville"}
                            {...registerUserInfos("city", {
                              required: true,
                              pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/, // validation rule to allow only letters
                            })}
                          />
                          {errorsRegisterUserInfos.city && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre ville
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.buttonRegister}>
                      <input
                        type="button"
                        onClick={handleButtonClickReturn3}
                        style={{color: "#000" , backgroundColor: "#fff",}}
                        value="Précédent"
                      />

                      <input type="submit" value={isLoadCreateUser ? "Chargement..." : "Étape suivante"} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : formStep === 2 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Nouveau ? Continuez votre inscription et recevez 50 OZA instantanément !</h2>
                  <p>
                    Pour recevoir vos gains, finalisez votre inscription, téléchargez l'app et activez votre portefeuille Ozapay ! 
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>
              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <p className={styles.step}>Étape 2 sur 9</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressSecondStep}></div>
                </div>
                <h2>Informations personnelles</h2>
                <form
                  className={styles.formContainer}
                  onSubmit={handleSubmitRegisterUserInfos(
                    onSubmitRegisterUserInfos
                  )}
                >
                  <div>
                    <p className={styles.pro}>{"Je suis un particulier"}</p>
                    <div className={styles.fullInput}>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"]
                            }
                            placeholder={"Nom du titulaire du compte"}
                            {...registerUserInfos("lastName", {
                              required: true,
                              pattern: onlyLettersRegex, // validation rule to allow only letters
                            })}
                          />
                          {errorsRegisterUserInfos.lastName && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre nom
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>

                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={styles.inputUserInfos}
                            placeholder={"Prénom"}
                            {...registerUserInfos("firstName", {
                              required: true,
                              pattern: onlyLettersRegex, // validation rule to allow only letters
                            })}
                          />
                          {errorsRegisterUserInfos.firstName && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre prénom
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.fullInput}>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"]
                            }
                            placeholder={"Adresse"}
                            {...registerUserInfos("firstAddress", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.firstAddress && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre adresse
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>

                      <div className={styles.oneInput}>
                        <input
                          className={
                            styles["inputUserInfos"] +
                            " " +
                            styles["inputMargin"]
                          }
                          placeholder={"Adresse 2"}
                          {...registerUserInfos("secondAddress", {})}
                        />
                      </div>
                    </div>
                    <div className={styles.fullInput}>
                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={
                              styles["inputLeft"] +
                              " " +
                              styles["inputUserInfos"] +
                              " " +
                              styles["inputMargin"]
                            }
                            placeholder={"Code Postal"}
                            {...registerUserInfos("postalCode", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.postalCode && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre code postal
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>

                      <div className={styles.oneInput}>
                        <div>
                          <input
                            className={styles.inputUserInfos}
                            placeholder={"Ville"}
                            {...registerUserInfos("city", {
                              required: true,
                            })}
                          />
                          {errorsRegisterUserInfos.city && (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Merci de renseigner votre ville
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.asteriskContainer}>
                          <span className={styles.asterisk}>*</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.buttonRegister}>
                      <input
                        type="button"
                        onClick={handleButtonClickReturn3}
                        style={{color: "#000" , backgroundColor: "#fff",}}
                        value="Précédent"
                      />

                      <input type="submit" value={isLoadCreateUser ? "Chargement..." : "Étape suivante"} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : formStep === 3 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Pré-ouvrez votre compte et gagnez des cryptos Ozapay !</h2>
                  <p>
                   Accédez à notre version Alpha Test Ozapay et découvrez nos premières fonctionnalités comme la gestion de votre portefeuille cryptos sous votre propre garde ! Nouveau ? Gagnez maintenant 50 OZA !
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>

              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <p className={styles.step}>Étape 1 sur 9</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFirstStep}></div>
                </div>
                <div className={styles.choiceContainer}>
                  <h2>Choix du type de compte</h2>
                    <div className={styles.selectContainer}>
                      <select
                        name="account_type"
                        id="account_type"
                        onChange={handleSelectChange}
                        style={{color: "black"}}
                      >
                        <option value="" disabled selected>
                          Type de compte
                        </option>
						<option value="particulier">Particulier</option>                        
						<option value="professionel">Professionnel</option>              
                      </select>
                      <img className={styles.arrow} src="arrow.png" />
                    </div>
                  {
                    isInConditionSectionDone ?
                    <div className={styles.choiceContainer}>
                    <h2>Affiliation et Contrats</h2>
                    <label htmlFor="condition">
                      ID du code affilié
                    </label>
                  <input
                  onChange={e => setAffiliateCode(e.target.value)}
                  style={{marginTop: "20px", marginBottom: "30px"}}
                    className={
                      styles["inputLeft"] +
                      " " +
                      styles["inputSpecial"] +
                      " " +
                      styles["inputEmail"]
                    }
                    placeholder={"Code affilié (optionnel)"}
                    type="text"
                  />
						<div style={{marginBottom: "20px", marginTop: "30px"}}>
					<label htmlFor="condition" >
                      Acceptation des Contrats
                    </label></div>
                  <div className={styles.checkBoxInput}>
                    <input checked={isAcceptedCondition} onChange={e => setIsAcceptedCondition(e.target.checked)} id="condition" type="checkbox" />
                    <label htmlFor="condition" style={{fontWeight: "500"}} >
                    J’ai lu et j’accepte les <a target="_blank" href="/pdf/cgu-ozapay.pdf">CGU</a>, les <a target="_blank" href="/pdf/cgv-ozapay.pdf">CGV</a>  et la <a target="_blank" href="/pdf/politiques-de-confidentialite.pdf">politique de confidentialité</a> Ozapay <span style={{color:"red"}}>*</span>
                    </label>
                  </div>
                  <div className={styles.checkBoxInput}>
                    <input checked={isAcceptedLastPromotion} onChange={e => setIsAcceptedLastPromotion(e.target.checked)} id="promotion" type="checkbox" />
                    <label htmlFor="promotion" style={{fontWeight: "500"}} >
                    J’accepte de recevoir les dernières promotions de Ozapay en matière de marketing <span style={{color:"red"}}>*</span>
                    </label>
                  </div>
					<br/><br/>
                    <div className={styles.buttonRegister}>
                      <input
                        type="button"
                        onClick={() => {setIsInConditionSectionDone(false)}}
                        style={{color: "#000" , backgroundColor: "#fff",}}
                        value="Précédent"
                      />
                      <input
                        type="button"
                        value="Accepter"
                        onClick={handleButtonClick}
                      />
                    </div>
                  </div>
                    :
                    <div className={styles.buttonRegister}>
                      <input
                        type="button"
                        onClick={handleButtonClickReturn0}
                        style={{color: "#000" , backgroundColor: "#fff",}}
                        value="Précédent"
                      />
                      <input
                        type="button"
                        value="Étape suivante"
                        onClick={handleCondition}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          ) : formStep === 4 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Pour votre sécurité, nous vérifions la bonne propriété de votre compte Ozapay</h2>
                  <p>
                   Continuez pour vérifier votre numéro de téléphone et votre adresse email...
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>
              <div
                className={styles["modalLeft"] + " " + styles["modalLeftCode"]}
              >
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                {
                  sucessCodePhoneEntered ?
                  <p className={styles.step}>Étape {isEmailSend ? '6' : '5'} sur 9</p>
                  :
                  <p className={styles.step}>Étape {isSMSSend ? '4' : '3'} sur 9</p>
                }
                <div className={styles.progressBar}>
                  <div className={styles.progressThirdStep}></div>
                </div>
                <h2>Vérifications de sécurité</h2>
                {sucessCodePhoneEntered ? 
				<div
                  className={
                    styles["fullInput"] + " " + styles["fullInputCode"]
                  }
                >
                  {
                    !isEmailSend ?
                  <form
                    className={styles.formContainer}
                    onSubmit={handleSubmitRegisterEmail(onSubmitRegisterEmail)}
                  >
                    <div className={styles.oneInput}>
                      <div>
                        <input
                          className={
                            styles["inputLeft"] +
                            " " +
                            styles["inputSpecial"] +
                            " " +
                            styles["inputEmail"]
                          }
                          placeholder={"Adresse e-mail"}
                          {...registerEmail("registerEmail", {
                            required: true,
                            pattern:
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                        />
                        {errorsRegisterEmail.registerEmail && (
                          <div className={styles.formErrorsContainer}>
                            <span className={styles.formErrors}>
                              Merci de renseigner votre adresse email
                            </span>
                          </div>
                        )}
                        {emailResponseError && (
                          <div className={styles.formErrorsContainer}>
                            <span style={{color: '#12abab', fontSize: '14px'}}>
                              {emailResponseError}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      {/* {noButtonMail ? (
                        <p className={styles.seconds}>{seconds}</p>
                      ) : (
                        <input
                          type="submit"
                          className={styles.send}
                          value="Envoyer"
                        />
                      )} */}
                      {sucessCodeEmail ? (
                        <div className={styles.formErrorsContainer}>
                          <span className={styles.formErrors}>
                            Le code à bien été envoyé
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div style={{marginTop: '40px'}} className={styles.buttonRegister}>
                      <input
                        type="button"
                        onClick={() => {setSucessCodePhoneEntered(false); setNoButtonMail(false)}}
                        style={{color: "#000" , backgroundColor: "#fff",}}
                        value="Précédent"
                      />
                      <input
                        type="submit"
                        value="Étape suivante"
                      />
                    </div>
                  </form>
                  :
                  <div className={styles.oneInput}>
                      <div>
                        {/* <input
                          onChange={(event) => setPhoneCode(event.target.value)}
                          value={phoneCode}
                          placeholder={"Code reçu par sms"}
                          className={
                            styles["codeInput"] + " " + styles["codeInputSMS"]
                          }
                        /> */}
                        <SecretCodeInput handleDigit={(e) => setEmailCode(e)} title="Code reçu par Email" />
                        {sucessCodeEmailEntered && !isLoadCheckCode ? (
                          <div className={styles.formErrorsContainer}>
                            <span className={styles.formErrors}>Code valide</span>
                          </div>
                        ) : null}
                        {textResendPhone && !sucessCodeEmailEntered && !isLoadCheckCode && (
                          <div className={styles.formErrorsContainer}>
                          <span className={styles.formErrors}>Code de vérification renvoyé par mail.</span>
                        </div>
                        )}
                        {isLoadCheckCode ? (
                          <div className={styles.formErrorsContainer}>
                            <span className={styles.formErrors}>Verification ...</span>
                          </div>
                        ) : null}
                      </div>
                      <div style={{marginTop: '40px'}} className={styles.buttonRegister}>
                          <input
                            type="button"
                            onClick={() => setIsEmailSend(false)}
                            style={{color: "#000" , backgroundColor: "#fff",}}
                            value="Précédent"
                          />
                            {
                              sucessCodeEmailEntered ?
                              <input
                                type="button"
                                value="Étape suivante"
                                onClick={() => {handleButtonClick3(); setNoButtonMail(false); setIsSecret(true);}}
                              />
                              : ""
                            }
                            <input
                                disabled={noButtonMail}
                                type="button"
                                value={noButtonMail ? seconds : "Renvoyer"}
                                onClick={onSubmitResendEmail}
                              />
                        </div>
                    </div>
                  }
                  {/* <div className={styles.oneInput}>
                    <div>
                      <input
                        onChange={(event) => setEmailCode(event.target.value)}
                        value={emailCode}
                        placeholder={"Code reçu par mail"}
                        className={styles.codeInput}
                      />
                      {sucessCodeEmailEntered ? (
                        <div className={styles.formErrorsContainer}>
                          <span className={styles.formErrors}>Code valide</span>
                        </div>
                      ) : null}
                    </div>
                  </div> */}
                </div> :
                <div
                  className={
                    styles["fullInput"] + " " + styles["fullInputCode"]
                  }
                >
                  {
                    !isSMSSend ?
                      <form
                        className={styles.formContainer}
                        onSubmit={handleSubmitRegisterPhone(onSubmitRegisterPhone)}
                      >
                        <div className={styles.oneInput}>
                          <div>
                            <PhoneInput
                              country={"fr"}
                              value={phone}
                              masks={{ ci: "........." }}
                              onChange={(phone, data) => handlePhoneDigit(phone, data.dialCode)}
                              containerStyle={{ width: "auto" }}
                              inputStyle={{
                                borderRadius: "35px",
                                paddingLeft: "60px",
                                lineHeight: "16px",
                                backgroundColor: "#FFFFFF",
                                height: "48px",
                                width: "336px",
                                color: "black",
                                marginRight: "32px",
                                marginBottom: "11.2px !important",
                              }}
                              buttonStyle={{
                                border: "none",
                                background: "none",
                                borderRadius: "35px",
                                marginLeft: "1.4rem",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          {/* {noButtonPhone ? (
                            <p className={styles.seconds}>{seconds}</p>
                          ) : (
                            <input
                              type="submit"
                              className={styles.send}
                              value="Envoyer"
                            />
                          )} */}
                          {sucessCodePhone ? (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                Le code à bien été envoyé
                              </span>
                            </div>
                          ) : null}
                          {
                            phoneResponseError ?
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>
                                {phoneResponseError}
                              </span>
                            </div>
                            : ''
                          }
                        </div>
                        <div style={{marginTop: '40px'}} className={styles.buttonRegister}>
                          <input
                            type="button"
                            onClick={handleButtonClickReturn}
                            style={{color: "#000" , backgroundColor: "#fff",}}
                            value="Précédent"
                          />
                          <input
                            type="submit"
                            value="Étape suivante"
                          />
                        </div>
                      </form>
                    :
                    <div className={styles.oneInput}>
                      <div>
                        {/* <input
                          onChange={(event) => setPhoneCode(event.target.value)}
                          value={phoneCode}
                          placeholder={"Code reçu par sms"}
                          className={
                            styles["codeInput"] + " " + styles["codeInputSMS"]
                          }
                        /> */}
                        <SecretCodeInput handleDigit={(e) => setPhoneCode(e)} title="Code reçu par SMS" />
                        {isPhoneCodeValid && !isLoadCheckCode ? (
                          <div className={styles.formErrorsContainer}>
                            <span className={styles.formErrors}>Code valide</span>
                          </div>
                        ) : null}
                        {textResendPhone && !isPhoneCodeValid && !isLoadCheckCode && (
                          <div className={styles.formErrorsContainer}>
                          <span className={styles.formErrors}>Code de vérification renvoyé par SMS.</span>
                        </div>)}
                        {isLoadCheckCode ? (
                          <div className={styles.formErrorsContainer}>
                            <span className={styles.formErrors}>Verification ...</span>
                          </div>
                        ) : null}
                      </div>
                      <div style={{marginTop: '40px'}} className={styles.buttonRegister}>
                          <input
                            type="button"
                            onClick={() => setIsSMSSend(false)}
                            style={{color: "#000" , backgroundColor: "#fff",}}
                            value="Précédent"
                          />
                          {/* {noButtonPhone ? (
                            <p className={styles.seconds}>{seconds}</p>
                          ) : (
                            <input
                              type="button"
                              value="Envoyer"
                              onClick={onSubmitRegisterPhone}
                            />
                          )} */}
                            {
                              isPhoneCodeValid ?
                              <input
                                type="button"
                                value="Étape suivante"
                                onClick={() => {
                                  setTextResendPhone(false);
                                  setSucessCodePhoneEntered(true); setNoButtonMail(false); }}
                              />
                              : ""
                            }
                            <input
                                disabled={noButtonPhone}
                                type="button"
                                value={noButtonPhone ? seconds : "Renvoyer"}
                                onClick={onSubmitResendCodeSMS}
                              />
                        </div>
                    </div>
                  }
                </div>
                }
              </div>
            </div>
          ) : formStep === 5 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Vous y êtes presque ! Choisissez un code de sécurité à l'abri des regards !</h2>
                  <p>
                    Une fois votre code de sécurité confirmé, accédez et essayez notre super application en alpha test !
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>
              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <p className={styles.step}>Étape {isPasswordValid ? '8' : '7'} sur 9</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFourStep}></div>
                </div>
                {
                  !isPasswordValid ?
                  <>
                  <h2>Choix du code de sécurité</h2>
                  <div className={styles.oneInput}>
                        <div>
                          <SecretCodeInput
                              id="newPwd"
                              handleDigit={(e) => setNewPwd(e)}
						      style={{fontWeight: "400" , marginBottom: "25px",}}
                              title="Tapez votre code de sécurité ici"
                              isSecret={isSecret}
                          />
                          {isValidPwd && !isLoadCreateSecurityCode ? (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>Code valide</span>
                            </div>
                          ) : null}
                          {isLoadCreateSecurityCode ? (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>Verification ...</span>
                            </div>
                          ) : null}
                          {
                            createPwdErrorMsg &&
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>{createPwdErrorMsg}</span>
                            </div>
                          }
                        </div>
                        <div style={{marginTop: '40px'}} className={styles.buttonRegister}>
                            <input
                              type="button"
                              onClick={handleButtonClickReturn4}
                              style={{color: "#000" , backgroundColor: "#fff",}}
                              value="Précédent"
                            />
                            <input
                                  type="button"
                                  value="Étape suivante"
                                  onClick={handleNewPwd}
                                />
                          </div>
                      </div>
                  </>
                  :
                  <>
                  <h2>Confirmation du code</h2>
                  <div className={styles.oneInput}>
                        <div>
                          <SecretCodeInput
                              id="confirmPwd"
                              handleDigit={(e) => setConfirmNewPwd(e)}
                              title="Confirmez votre code ici"
                              isSecret={isSecret}
                          />
                          {/* {sucessCodeEmailEntered && !isLoadCreateSecurityCode ? (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>Code valide</span>
                            </div>
                          ) : null} */}
                          {isLoadCreateSecurityCode ? (
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>Enregistrement ...</span>
                            </div>
                          ) : null}
                          {
                            createPwdErrorMsg &&
                            <div className={styles.formErrorsContainer}>
                              <span className={styles.formErrors}>{createPwdErrorMsg}</span>
                            </div>
                          }
                        </div>
                        <div style={{marginTop: '40px'}} className={styles.buttonRegister}>
                            <input
                              type="button"
                              onClick={() => { setIsPasswordValid(false);}}
                              style={{color: "#000" , backgroundColor: "#fff",}}
                              value="Précédent"
                            />
                            <input
                                  type="button"
                                  value="Étape suivante"
                                  onClick={onSubmitPassword}
                                />
                          </div>
                      </div>
                  </>
                }
              </div>
            </div>
          ) : formStep === 6 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Merci, vous pouvez maintenant essayer notre super application !</h2>
<p>Téléchargez Ozapay, activez votre portefeuille crypto, récupérez vos 50 OZA et restez à l'affut des nouvelles mises à jour !</p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>
              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <p className={styles.step}>Étape 9 sur 9</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFifthStep}></div>
                </div>
                <h2>Bravo, votre demande d'ouverture de compte est bien prise en compte !  </h2>
                <p style={{marginBottom: "1rem"}}>Un email de confirmation vient d'être envoyé</p>
                <div className={styles.storeButtons}>
                <a href="https://cutt.ly/Mrq2DyXa"  className={styles.boxSocialMedia} download>
                  <img src="googleplay.png"/>
                  <div>
                    <p>Télécharger la démo pour Android</p>
                  </div>
                </a>
                <a href="#" className={styles.boxSocialMedia} download>
                  <img src="applestore.webp"/>
                  <div>
                    <p>Télécharger la démo pour IOS</p>
                  </div>
                </a>
              </div>
              <a href="https://phantom.com/" className={styles.phandomLink}>ou Téléchargez l'application Phantom</a>

                <div className={styles.buttonRegister}>
                  {!isFromLogin && <input
                    type="button"
                    onClick={handleButtonClickReturn6}
                    style={{color: "#000" , backgroundColor: "#fff",}}
                    value="Précédent"
                  />}
                  <input type="button" onClick={createUser} value="Terminer" />
                </div>
                <br/>
                <br/>
                <br/>
                <h2>Rejoignez notre programme d'affiliation et commencez à gagner de l'argent dès maintenant !</h2>
                <p style={{marginBottom: "1rem"}}>Votre code affilié: {affiliateCode} </p>
                
              </div>
              
            </div>
          ) : formStep === 7 ? (
            <div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Rejoignez notre programme d'affiliation et commencez à gagner de l'argent dès maintenant</h2>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>
              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <h2>Réinitialiser le mot de passe dsds</h2>
                <p className={styles.toConnect}>
                  Saisissez l'adresse e-mail associé à votre compte.
                </p>
                <form
                  className={styles.formContainer}
                  onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}
                >
                  <label>Email</label>
                  <div className={styles.oneInput}>
                    <input
                      className={
                        styles["inputLeft"] + " " + styles["inputReset"]
                      }
                      type="email"
                      placeholder="adresse@fai.com"
                      {...registerNewPassword("email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
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
                      <div className={styles.buttonLogin}>
                        <input type="submit" value="Étape suivante" />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : formStep === 8 ? (
<div className={styles.modalContainer}>
              <div className={styles.modalRight}></div>
              <div className={styles.modalRightShadow}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalMobile"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <div className={styles.logoContainer}>
                  <img src="ozaLogo.png" />
                </div>
                <div className={styles.welcome}>
                  <h2>Recevez dès maintenant un nouveau mot de passe temporaire</h2>
                  <p>
                    Sur chaque connexion et durant toute la période de développement, les mots de passe sont strictement temporaires pour plus de sécurité.
                  </p>
                </div>
                <div className={styles.bottomShadow}>
                  <p>Vous avez déjà un compte chez nous ?</p>
                  <p
                    className={styles.registerText}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Se Connecter
                  </p>
                </div>
              </div>
              <div className={styles.modalLeft}>
                <HiX
                  className={
                    styles["closeModal"] + " " + styles["closeModalDesktop"]
                  }
                  onClick={() => {
                    setLoginModal(0), setFormStep(isFromLandingPage ? 3 : 0);
                  }}
                />
                <h2>Réinitialiser le mot de passe</h2>
                <p className={styles.toConnect}>
                  Saisissez l'adresse e-mail associé à votre compte.
                </p>
                <form
                  className={styles.formContainer}
                  onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}
                >
                  <label>Email</label>
                  <div className={styles.oneInput}>
                    <input
                      className={
                        styles["inputLeft"] + " " + styles["inputReset"]
                      }
                      type="email"
                      placeholder="adresse@fai.com"
                      {...registerNewPassword("email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
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
                      <div className={styles.buttonLogin}>
                        <input type="submit" value="Étape suivante" />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      ) : loginModal === 2 ? (
        <div className={styles.modalBackground}>
          <div className={styles.modalSucessContainer}>
            <div className={styles.modalSucess}>
              <div className={styles.validationContainer}>
                <img src="validationTest.png" />
              </div>
              <h2>Incription terminée</h2>
              <p>Bravo, vous venez d'ouvrir votre compte !</p>
              <p>
                Connectez vous dès maintenant pour profiter de toute
                l'expérience Ozapay.
              </p>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => {
                    setLoginModal(1);
                    setFormStep(0);
                  }}
                >
                  Se Connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
