import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const Context = createContext();

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [authValue, setAuthValue] = useState(null);

  return (
    <Context.Provider value={{ user, setUser, authValue, setAuthValue }}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
