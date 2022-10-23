import React from "react";
import { ConsentContext } from "../components/ConsentContextProvider";

const useConsentContext = () => {
  const { hasConsent, askUserForConsent } = React.useContext(ConsentContext);
console.log('');
  return { hasConsent, askUserForConsent };
};

export default useConsentContext;
