import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "428304bf-e4ec-4b8f-9909-2b3dedd92b74";

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Ce composant ne rend rien
};

export default CrispChat;
