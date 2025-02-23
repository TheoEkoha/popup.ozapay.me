import styles from "./Collect.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../../Context";
import { useForm } from "react-hook-form";

let digit = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0"];

export default function Collect() {
  const { menuPage, setMenuPage, amount, setAmount, menu, setMenu } =
    useContext(DataContext);
  const { register, handleSubmit } = useForm();

  const [data, setData] = useState("");

  const ref = useRef();
  useEffect(() => {
    const toggleMenu = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (menu && ref.current && !ref.current.contains(e.target)) {
        setMenu(false);
        setMenuPage("home");
      }
    };
var invalidChars = [
      "-",
      "+",
      /* "e", */
    ];
    
    inputBox.addEventListener("keydown", function(e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    });
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", toggleMenu);
    };
  }, [menu]);

  return (
    <div className={styles.collectBackground}>
      <div className={styles.collectContainer}>
        <div className={styles.collect} ref={ref}>
          <div className={styles.collectHeader}>
            <div
              className={styles.arrowHeader}
              onClick={() => setMenuPage("transaction")}
            ></div>
            <p className={styles.titleHeader}>Encaisser</p>
          </div>
          <div className={styles.collectMain}>
            <div className={styles.collectFormContainer}>
              <form
                className={styles.collectForm}
                /*onSubmit={handleSubmit((data) => setData(data))}*/
              >
                <input
                  className={styles.collectFormAmount}
				  id="inputBox"
                  /*{...register("amount")}*/
                  name="amount"
                  placeholder="0, 00"
                  value={amount}
				  onChange={(e) => {
				  setAmount(e.target.value);
            }}
                />
                <input
                  className={styles.collectFormDesription}
                  {...register("description")}
                  placeholder="Description (facultatif)"
                />
              </form>

              <div className={styles.calculatorContainer}>
                {digit.map((digit, index) => {
                  return (
                    <div
                      className={styles.digitContainer}
                      key={index}
                      onClick={() => {
                        setAmount(amount + digit);
                      }}
                    >
                      {digit}
                    </div>
                  );
                })}
                <div className={styles.eraseContainer}>
                  <img
                    className={styles.erase}
                    src="effacer.png"
                    alt="effacer"
                    onClick={() => {
                      setAmount(amount.slice(0, -1));
                    }}
                  />
                </div>
                <button
                  className={styles.invoiceButton}
                  onClick={() => {
                    setMenuPage("qrCode");
                  }}
                >
                  Facturer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
