import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);

  return (
    <Context.Provider
      value={{ isLoggedIn, setIsLoggedIn, authValue, setAuthValue }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
