import { Crisp } from 'crisp-sdk-web';
import { useEffect, useContext } from "react";
import { DataContext } from "./Context";

export default function CrispChat() {
  const { menu,loginModal } = useContext(DataContext);
	
  useEffect(() => {
    Crisp.configure('428304bf-e4ec-4b8f-9909-2b3dedd92b74'); // Replace with your Crisp Website ID
    
   if (menu || loginModal == 1) {
	  Crisp.chat.hide();
       // Show the Crisp chat widget
    } else {
      Crisp.chat.show(); // Hide the Crisp chat widget
    }

    // Clean up by hiding the chat when the component is unmounted
    return () => {
      Crisp.chat.show();
    };
  }, [menu, loginModal]);

  return null;
};