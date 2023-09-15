import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);
  const [displayMenuModal, setDisplayMenuModal] = useState(false);
  const [boardDetails, setBoardDetails] = useState(null);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authValue,
        setAuthValue,
        displayMenuModal,
        setDisplayMenuModal,
        boardDetails,
        setBoardDetails,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
