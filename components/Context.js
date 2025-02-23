import { getCookie } from "cookies-next";
import { createContext, useState } from "react";

export const DataContext = createContext();

export default function ContextProvider(props) {
  const [isFromLandingPage, setIsFromLandingPage] = useState(false)
  const [loginModal, setLoginModal] = useState(0);
  const [lostPasswordModal, setLostPasswordModal] = useState(false);
  const [token, setToken] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuPage, setMenuPage] = useState("home");
  const [userData, setUserData] = useState();
  const [amount, setAmount] = useState("");
  const [rgpd, setRgpd] = useState(false); 
  const [availableModal, setAvailableModal] = useState(false);
  const [showCountModal, setShowCountModal] = useState(false);
  const [walletId, setWalletId] = useState(false);
  const [BSCAmount, setBSCAmount] = useState("");
  const [openConnectBSCWallet, setOpenConnectBSCWallet] = useState(false);
  const [BSCWallet, setBSCWallet] = useState("");
  const [isOpenReset, setIsOpenReset] = useState(false)

  return (
    <DataContext.Provider
      value={{
        isOpenReset,
        setIsOpenReset,
        isFromLandingPage,
        setIsFromLandingPage,
	      availableModal,
        setAvailableModal,
        loginModal,
        setLoginModal,
        lostPasswordModal,
        setLostPasswordModal,
        token,
        setToken,
        menu,
        setMenu,
        menuPage,
        setMenuPage,
        userData,
        setUserData,
        amount,
        setAmount,
        rgpd,
        setRgpd,
        showCountModal,
        setShowCountModal,
	    openConnectBSCWallet,
	  	setOpenConnectBSCWallet,
	    BSCWallet,
        setBSCWallet,
	    BSCAmount,
        setBSCAmount,
	    walletId,
        setWalletId,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
