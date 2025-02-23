import Home from "./Home/Home";
import Wallet from "./Wallet/Wallet";
import Transaction from "./Transaction/Transaction";
import Collect from "./Collect/Collect";
import QrCode from "./QrCode/QrCode";
import Recharge from "./Recharge/Recharge";
import WalletID from "./WalletID/WalletID";
import Profile from "./Profile/Profile";
import Reglage from "./Reglage/reglage";
import Activite from "./Activite/Activite";
import ConnectBSCWallet from "./ConnectBSCWallet/ConnectBSCWallet";
import SucessConnectBSC from "./SucessConnectBSC/SucessConnectBSC";
import Choice from "./Choice/Choice";
import Setting from "./Setting/Setting";
import { useState, useEffect, useRef, useContext, Profiler } from "react";
import { DataContext } from "../Context";

export default function Menu() {
  const { menu, setMenu, menuPage, setMenuPage } = useContext(DataContext);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "auto";
  }, [menu]);

  if (menu) {
    switch (menuPage) {
      case "home":
        return <Home />;

      case "wallet":
        return <Wallet />;

      case "transaction":
        return <Transaction />;

      case "connectbscwallet":
        return <ConnectBSCWallet />;

	  case "sucessconnectbsc":	
		return <SucessConnectBSC />;
		
      case "collect":
        return <Collect />;

      case "qrCode":
        return <QrCode />;

      case "recharge":
        return <Recharge />;

      case "walletID":
        return <WalletID />;

      case "profile":
        return <Profile />;

      case "annonces":
        return <Activite />;

      case "reglage":
        return <Reglage />;
		
	  case "setting":
        return <Setting />;
		
	  case "choice":
		return <Choice />;
    }
  } else {
    return null;
  }
}
