import React from "react";
import Cookies from "js-cookie";
import { USER_CONTENT } from "../utils/config";

export const ConsentContext = React.createContext({
  hasConsent: false,
  askUserForConsent: () => {},
});

const ConsentContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [hasConsent, setHasConsent] = React.useState(
    Cookies.get("view-nsfw-consent") === USER_CONTENT.YES
  );
  const [showConsentDialog, setShowConsentDialog] = React.useState(false);

  const setConsent = (consent) => {
    Cookies.set("view-nsfw-consent", consent, { expires: 365 });
    setHasConsent(consent === USER_CONTENT.YES);
    closeConsentDialog();
  };

  const askUserForConsent = () => {
    setShowConsentDialog(true);
  };

  const closeConsentDialog = () => {
    setShowConsentDialog(false);
  };

  React.useEffect(() => {
    if (showConsentDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConsentDialog]);

  return (
    <ConsentContext.Provider
      value={{
        hasConsent,
        askUserForConsent,
      }}
    >
      {children}
      {showConsentDialog && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-40 h-full w-full flex items-center justify-center z-10">
          <div className="h-48 bg-white rounded-md px-4 py-2 flex flex-col">
            <div
              className="text-right text-2xl cursor-pointer"
              onClick={() => closeConsentDialog()}
            >
              &times;
            </div>
            <p className="text-xl font-bold mt-2 mb-10">
              Possibly sensitive (NSFW) content - are you sure you wish to
              proceed?
            </p>
            <div className="flex items-center justify-around">
              <button
                className="bg-loopring-darkBlue text-white px-12 py-2 rounded-md"
                onClick={() => setConsent(USER_CONTENT.YES)}
              >
                Yes
              </button>
              <button
                className="text-loopring-darkBlue border border-loopring-darkBlue px-12 py-2 rounded-md"
                onClick={() => setConsent(USER_CONTENT.NO)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  );
};

export default ConsentContextProvider;
