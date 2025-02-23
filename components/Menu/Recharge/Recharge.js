import styles from "./Recharge.module.css";
import { useForm } from "react-hook-form";
import { useState, useContext, useRef, useEffect } from "react";
import { DataContext } from "../../Context";
import { setCookies,getCookie } from "cookies-next";
import axios from "axios";


export default function Recharge() {
  const { menuPage, setMenuPage, menu, setMenu,setClientSecret,setAvailableModal,availableModal } = useContext(DataContext);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [amount, setAmount] = useState('');
  const ref = useRef();
  const refScroll = useRef();
 
  /*const testFunction = (e) => {
    setCookies("amount", amount);
    setMenuPage("choice");
    const  amounttest  = getCookie("amount",amount);
    
    const currency = "EUR"; 
    
  
    axios
    .post(
      `http://localhost:8000/stripe`,
      {
        amounttest,
        currency
        
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
       setClientSecret(response.data);
      
      
    }).catch(err => {
      // Handle error
      console.log(err);
  });
  
  
  
  }
 */
  const handleChange = event => {
    const test = setAmount(event.target.value);
    
   /*  console.log('value is:', event.target.value); */
  };
  const handleClick = (number) => {
    

    // 👇️ value of input field
    console.log('old value: ', amount);

    // 👇️ set value of input field
    setAmount(number);
  };

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

function NotAvailableModal() {
    setAvailableModal(true);
 }
  useEffect(() => {

    if(amount < 24 ){
      const test = refScroll.current.scrollLeft = 0;
      console.log(test);
    }

    if(amount >= 25){
      
      const test = refScroll.current.scrollLeft = 197;
      console.log(test);
    }

    if(amount >= 50 ){
      
      const test = refScroll.current.scrollLeft = 439;
      console.log(test);
    }

    if(amount >= 75){
      
      const test = refScroll.current.scrollLeft = 681.9;
      console.log(test);
    }

    if(amount >= 100){
      
      const test = refScroll.current.scrollLeft = 1000;
      console.log(test);
    }
}, [amount]);

  return (
    <div className={styles.rechargeBackground}>
      <div className={styles.rechargeContainer}>
        <div className={styles.recharge} ref={ref}>
          <div className={styles.rechargeHeader}>
            <div
              className={styles.arrowHeader}
              onClick={() => setMenuPage("home")}
            ></div>
            <p className={styles.test}>{"Recharger"} </p>
          </div>
          <div className={styles.rechargeMain}>
            
              <div className={styles.ozaphyreHeader}>
                <p>{"Entrez un montant à recharger et profitez en communauté !"}</p>
              </div>
              
              <div ref={refScroll} className={styles.offersBigContainer}>
              <div onClick={() => {handleClick("0")}}  className={ styles["offersContainer"] + " " + styles["offers-x1"]}>
                  
                    <div   className={styles.leftIcon}>
                      <img src="rocket.png"></img>
                    </div>
                    <div className={styles.offers}>
                      <p>Dès 0,00 €OZP</p>
                      <p>Accepter, Encaissez et Recevoir des €OZP !</p>
                    </div>
                  
                </div>
                <div onClick={() => {handleClick("25")}} className={ styles["offersContainer"] + " " + styles["offers-x2"]}>
                  
                    <div  className={styles.leftIcon}>
                      <img src="rechargeTransfer.png"></img>
                    </div>
                    <div className={styles.offers}>
                      <p>Dès 25 €OZP</p>
                      <p>Transférer de l'argent et Payer via QR-Code !</p>
                    </div>
                  
                </div>
                <div onClick={() => {handleClick("50")}} className={ styles["offersContainer"] + " " + styles["offers-x3"]}>
                  
                <div  className={styles.leftIcon}>
                      <img src="money.png"></img>
                    </div>
                    <div className={styles.offers}>
                      <p>Dès 50 €OZP</p>
                      <p>Publier des annonces et Gagner des €OZP !</p>
                    </div>
                  
                </div>
                <div onClick={() => {handleClick("75")}}  className={ styles["offersContainer"] + " " + styles["offers-x4"]}>
                  
                <div  className={styles.leftIcon}>
                      <img src="marketing.png"></img>
                    </div>
                    <div className={styles.offers}>
                      <p>Dès 75 €OZP</p>
                      <p>Placer des €OZP et Gagner un rendement !</p>
                    </div>
                  
                </div>

                <div onClick={() => {handleClick("100")}}  className={ styles["offersContainer"] + " " + styles["offers-x5"]}>
                  
                <div  className={styles.leftIcon}>
                    <img src="flow.png"></img>
                  </div>
                  <div className={styles.offers}>
                    <p>Dès 100 €OZP</p>
                    <p>Convertir des €OZP !</p>
                  </div>
                
              </div>
            </div>
              
            <form className={styles.rechargeForm} onSubmit={handleSubmit((data) => setData(data))}>
              <input className={styles.rechargeFormAmount} id="inputBox" name="text" 
              {...register("amount")}
              placeholder="0, 00" type="number" value={amount} onChange={handleChange}
              />
              <div className={styles.rechargeFormCurencies}>
                <p>{"€OZP"}</p>
              </div>
            </form>
            <div className={styles.notice}>
              <p>Parfait pour commencer !</p>
              <p className={styles.smallText}>Accepter, Encaisser et Recevoir des €OZP en moins de 3 secondes seulement ! </p>
            </div>
           
            
              
            
              {/* <div className={styles.option}>
              {amount >= 100 ? <img src="check.png" className={styles.optionsIconCheck}></img> : <img src="dash.png" className={styles.optionsIcon}></img>}
                <p className={styles.optionDescription}>
                  {"Echanger mes OZP's en OZG, EUR, BTC ..."}
                </p>
              </div> */}

              <button  onClick={
                  NotAvailableModal
                }  className={styles.optionButton}>{"CONTINUER"}</button>
             {/* {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <Choice />
                  </Elements>
                )} */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
