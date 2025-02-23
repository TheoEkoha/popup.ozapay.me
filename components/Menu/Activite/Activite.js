import styles from "./Activite.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCallback, useRef, useState, useEffect, useContext } from "react";
import { DataContext } from "../../Context";
import { getCookie, removeCookies } from "cookies-next";
import variables from "../../../variables.json";

export default function Activite() {
  const { menu, setMenu, menuPage, setMenuPage,availableModal,
    setAvailableModal,} = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const test = useRef();
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
	
	
  const [selectedCategory, setSelectedCategory] = useState("Aventures");
  const [selectedEquipment, setSelectedEquipment] = useState("Wifi");
  const [selectedImage, setSelectedImage] = useState(null);
  const options = [
    { value: "", text: "Par personne" },
    { value: "Pour chaque personne", text: "Pour chaque personne" },
    { value: "Par membre", text: "Par membre" },
  ];
  const optionsCashBack = [
    { value: "", text: "Sur tout l’établissement" },
    { value: "Choix Cashback 1 ", text: "Choix Cashback 1" },
    { value: "Choix Cashback 2", text: "Choix Cashback 2" },
  ];
  const optionsTypeActivity = [
    { value: "", text: "Convient pour tous publics" },
    { value: "Choix Type Activite 1 ", text: "Choix Type Activite 1" },
    { value: "Choix Type Activite 2", text: "Choix Type Activite 2" },
  ];
  const [selected, setSelected] = useState(options[0].value);
  const [selectedCashback, setSelectedCashback] = useState(
    optionsCashBack[0].value
  );
  const [selectedTypeActivity, setSelectedTypeActivity] = useState(
    optionsTypeActivity[0].value
  );
  const [day, setDay] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");

  const [showMessageActivity, setShowMesssageActivity] = useState("");
  const ref = useRef(null);
  const carouselTestRef = useRef(null);
  const tarifMode = useRef();
  const cashBackMode = useRef();
  const typeActivity = useRef();
  const handleCategoryClick = (category) => {
    console.log("Clicked category:", category);
    setSelectedCategory(category);
  };

  const handleEquipmentClick = (equipment) => {
    console.log("Clicked equipment:", equipment);
    setSelectedEquipment(equipment);
  };

  let token = getCookie("token");

  const handleNextTest = () => {
    const container = carouselTestRef.current;
    const scrollAmount = container.offsetWidth;

    if (
      container.scrollLeft + container.offsetWidth >=
      container.scrollWidth - scrollAmount
    ) {
      // On the last two divs, show the first div
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleTarifMode = (e) => {
    setSelected(e.target.value);
  };
  const handleCashBackMode = (e) => {
    setSelectedCashback(e.target.value);
  };
  const handleTypeActivity = (e) => {
    setSelectedTypeActivity(e.target.value);
  };

  const inputElement = useRef(null);
  const handleImageSelect = (image) => {
    setSelectedImage(image);
    console.log(selectedImage);
  };

  const handleImageClick = () => {
    inputElement.current.click();
  };
  const handleLabelClick = () => {
    setDay(!day);
  };
  const handleRadioChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const onSubmit = (data) => {
    // Get the default values
    let defaultSelected = "Par personne";
    let defaultSelectedCashback = "Sur tout l’établissement";
    let defaultSelectedTypeActivity = "Convient pour tous publics";

    // Use the user-selected values if available, otherwise use defaults
    let tarifModeValue = tarifMode.current.value || defaultSelected;
    let cashBackModeValue =
      cashBackMode.current.value || defaultSelectedCashback;
    let typeActivityValue =
      typeActivity.current.value || defaultSelectedTypeActivity;

    const selectedCategoryValue = selectedCategory;

    const selectedDayValue = selectedDay;

    const selectedEquipmentValue = selectedEquipment;

    axios
      .post(
        `${variables.DATA_URL}/activity/addmyactivities`,
        {
          data: data,
          tarifModeValue: tarifModeValue,
          cashBackModeValue: cashBackModeValue,
          typeActivityValue: typeActivityValue,
          selectedCategoryValue: selectedCategoryValue,
          selectedDayValue: selectedDayValue,
          selectedEquipmentValue: selectedEquipment,
          token,
        },
        {
          //withCredentials: true,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.message);
        setShowMesssageActivity(response.data.message);
      });
  };
  return (
    <>
      <div className={styles.ActiviteBackground}>
        <div className={styles.ActiviteContainer}>
          <div className={styles.Activite} ref={ref}>
            <div className={styles.ActiviteHeader}>
              <div
                className={styles.arrowHeader}
                onClick={() => setMenuPage("home")}
              ></div>
              <p className={styles.test}>{"Espace promotionnel"} </p>
            </div>

            <div className={styles.ActiviteMain}>
              <div>
                <h1>Présentation</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.scrollBar}>
                    <div>
                      <div className={styles.formFirstPart}>
                        <div className={styles.InputContainer}>
                          <label className={styles.loginLabel}>Nom</label>
                          <input
                            className={styles.loginInput}
                            type="text"
                            placeholder="Établissement, Propositon..."
                            {...register("name", { required: true })}
                          />
                        </div>
                        {errors.name && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <div className={styles.InputContainer}>
                          <label className={styles.loginLabel}>Ville</label>
                          <input
                            className={styles.loginInput}
                            type="text"
                            placeholder="Lieu de l’activité commerciale"
                            {...register("city", { required: true })}
                          />
                        </div>
                        {errors.city && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <div className={styles.InputContainer}>
                          <label className={styles.loginLabel}>Tarif</label>
                          <p className={styles.tariFrom}>dès</p>
                          <input
                            className={
                              styles["loginInput"] +
                              " " +
                              styles["specialInput"]
                            }
                            type="text"
                            placeholder="100€"
                            {...register("minimumPrice", { required: true })}
                          />

                          <div className={styles.choice}>
                            <select
                              value={selected}
                              ref={tarifMode}
                              onChange={handleTarifMode}
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors.minimumPrice && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <div className={styles.InputContainer}>
                          <label className={styles.loginLabel}>Cashback</label>
                          <input
                            className={
                              styles["loginInput"] +
                              " " +
                              styles["specialInput"]
                            }
                            type="text"
                            placeholder="2,5%"
                            {...register("cashBack", { required: true })}
                          />

                          <div className={styles.choiceCashback}>
                            <select
                              value={selectedCashback}
                              ref={cashBackMode}
                              onChange={handleCashBackMode}
                            >
                              {optionsCashBack.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors.cashBack && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <div className={styles.InputContainer}>
                          <label className={styles.loginLabel}>Validité</label>
                          <input
                            className={
                              styles["loginInput"] +
                              " " +
                              styles["InputCalendar"]
                            }
                            type="text"
                            placeholder="Ouvrir le calendrier"
                            {...register("validity", { required: true })}
                          />
                        </div>
                        {errors.validity && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <label className={styles.loginLabel}>
                          Galerie d'images
                        </label>

                        <div
                          className={styles.containerIconNoImage}
                          onClick={handleImageClick}
                        >
                          <img
                            className={styles.IconNoImage}
                            src={
                              selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : "/NoImage.png"
                            }
                            alt="Click to Upload"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageSelect(e.target.files[0])}
                          style={{ display: "none" }}
                          ref={inputElement}
                        />

                        <div className={styles.InputContainer}>
                          <label
                            className={
                              styles["loginLabel"] +
                              " " +
                              styles["loginLabelSpecial"]
                            }
                          >
                            Site internet
                          </label>

                          <input
                            className={
                              styles["loginInput"] +
                              " " +
                              styles["InputWithoutBorder"]
                            }
                            type="text"
                            placeholder="https://www.monsite.com"
                            {...register("website", { required: true })}
                          />
                        </div>
                        {errors.website && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <div className={styles.InputContainer}>
                          <label className={styles.loginLabel}>Téléphone</label>
                          <input
                            className={
                              styles["loginInput"] +
                              " " +
                              styles["InputWithoutBorder"]
                            }
                            type="text"
                            placeholder="(0)1.xx.xx.xx.xx"
                            {...register("phoneNumber", { required: true })}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className={styles.errorMessage}>
                            Ce champ est obligatoire
                          </p>
                        )}
                        <div className={styles.InputContainer}>
                          <label
                            className={
                              styles["loginLabel"] +
                              " " +
                              styles["loginLabelSpecial"]
                            }
                          >
                            Type d'activité
                          </label>
                          <div className={styles.choiceTypeActivite}>
                            <select
                              value={selectedTypeActivity}
                              ref={typeActivity}
                              onChange={handleTypeActivity}
                            >
                              {optionsTypeActivity.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.formSecondPart}>
                      <label className={styles.loginLabel}>
                        Horaires d'ouverture
                      </label>
                      <div className={styles.days}>
                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(1);
                          }}
                        >
                          <img
                            src={day == 1 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="lundi"
                              onChange={handleRadioChange}
                            />
                            Lundi
                          </div>
                          {day == 1 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>

                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(2);
                          }}
                        >
                          <img
                            src={day == 2 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="mardi"
                              onChange={handleRadioChange}
                            />
                            Mardi
                          </div>
                          {day == 2 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>

                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(3);
                          }}
                        >
                          <img
                            src={day == 3 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="mercredi"
                              onChange={handleRadioChange}
                            />
                            Mercredi
                          </div>
                          {day == 3 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>

                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(4);
                          }}
                        >
                          <img
                            src={day == 4 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="jeudi"
                              onChange={handleRadioChange}
                            />
                            Jeudi
                          </div>
                          {day == 4 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>

                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(5);
                          }}
                        >
                          <img
                            src={day == 5 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="vendredi"
                              onChange={handleRadioChange}
                            />
                            Vendredi
                          </div>
                          {day == 5 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>

                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(6);
                          }}
                        >
                          <img
                            src={day == 6 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="samedi"
                              onChange={handleRadioChange}
                            />
                            Samedi
                          </div>
                          {day == 6 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>

                        <label
                          className={styles.daySelected}
                          onClick={() => {
                            setDay(7);
                          }}
                        >
                          <img
                            src={day == 7 ? "buttonBlue.png" : "buttonGrey.png"}
                            alt="Button"
                          />
                          <div className={styles.customRadio}>
                            <input
                              className={styles.loginInputRadio}
                              type="radio"
                              name="horaires"
                              value="dimanche"
                              onChange={handleRadioChange}
                            />
                            Dimanche
                          </div>
                          {day == 7 ? (
                            <div className={styles.time}>
                              <p>de</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="10h"
                                {...register("morningDate1", {
                                  required: true,
                                })}
                              />
                              <p>à</p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="12h"
                                {...register("morningDate2", {
                                  required: true,
                                })}
                              />
                              <p className={styles.and}> et de </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="14h"
                                {...register("afternoonDate1", {
                                  required: true,
                                })}
                              />
                              <p>à </p>
                              <input
                                className={styles.inputTime}
                                type="number"
                                placeholder="18h"
                                {...register("afternoonDate2", {
                                  required: true,
                                })}
                              />
                              <input type="checkbox" />
                              <label className={styles.checkboxLabel}>
                                ouvert sans interruption
                              </label>
                            </div>
                          ) : null}
                        </label>
                      </div>
                      <label className={styles.loginLabel}>Présentation</label>
                      <textarea
                        className={styles.textareaInput}
                        placeholder="Tapez ici votre description (ou programme)"
                        {...register("presentation", { required: true })}
                      />
                      {errors.presentation && (
                        <p className={styles.errorMessage}>
                          Ce champ est obligatoire
                        </p>
                      )}

                      <label className={styles.loginLabel}>
                        Précisions et Parking
                      </label>
                      <textarea
                        className={styles.textareaInput}
                        placeholder="Décrivez l’accès à votre activité, nombre de places, accès PMR..."
                        {...register("precision", { required: true })}
                      />
                      {errors.precision && (
                        <p className={styles.errorMessage}>
                          Ce champ est obligatoire
                        </p>
                      )}
                      <label className={styles.loginLabel}>Equipements</label>
                      <div className={styles.equipments}>
                        <div
                          className={styles.equipment}
                          onClick={() => handleEquipmentClick("Wifi")}
                        >
                          <img src="wifiBlack.png" />
                          <p
                            className={
                              selectedEquipment === "Wifi"
                                ? styles.equipmentBlue
                                : styles.equipment
                            }
                          >
                            Wifi
                          </p>
                        </div>
                        <div
                          className={styles.equipment}
                          onClick={() => handleEquipmentClick("Télévision")}
                        >
                          <img src="television.png" />
                          <p
                            className={
                              selectedEquipment === "Télévision"
                                ? styles.equipmentBlue
                                : styles.equipment
                            }
                          >
                            Télévision
                          </p>
                        </div>
                        <div
                          className={styles.equipment}
                          onClick={() => handleEquipmentClick("Souvenirs")}
                        >
                          <img src="shop1.png" />
                          <p
                            className={
                              selectedEquipment === "Souvenirs"
                                ? styles.equipmentBlue
                                : styles.equipment
                            }
                          >
                            Souvenirs
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      // Register the hidden input field
                      value={selectedCategory} // Set the value to the selected category
                    />
                    <div className={styles.buttonContainer}>
                      <button className={styles.Button} type="submit">
                        Enregistrer
                      </button>
                    </div>
                    {showMessageActivity && (
                      <p className={styles.messageSaved}>
                        {showMessageActivity}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
