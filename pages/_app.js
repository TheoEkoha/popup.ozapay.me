import "../styles/globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";
import LoginModal from "../components/Modals/LoginModal/LoginModal";
import LostPasswordModal from "../components/Modals/LostPasswordModal/LostPasswordModal";
import ContextProvider from "../components/Context";
import NotAvailableModal from "../components/Modals/NotAvailableModal/NotAvailableModal";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import ReactGA from 'react-ga4' ; ReactGA.initialize('G-C6382MPXR0') ;
import { useState, useContext, useEffect } from "react";

import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

const CrispWithNoSSR = dynamic(
  () => import('../components/crisp'),
  { ssr: false }
);

const handleButtonClick = () => { ReactGA.event({ category : 'User', action : 'Clicked a button' }) ; } ;

function MyApp({ Component, pageProps }) {
	useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    ReactGA.send({ hitType : "pageview", page : window.location.pathname }) ;
  }, []);

  const routes = useRouter()
	/**
   * this update is needed to hide some section in curent landing page
   */
return (
    <ContextProvider>
	  <CrispWithNoSSR /> 
      <LoginModal />
      <LostPasswordModal />
	   <NotAvailableModal />
      <Menu />
      {
        routes.pathname !== "/" ? 
        <Header>
          <Footer>
        
            <Component {...pageProps} />
        
          </Footer>
        </Header> :
            <Component {...pageProps} />
      }
    </ContextProvider>
  );
}

export default MyApp;