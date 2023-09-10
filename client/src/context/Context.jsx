import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [authValue, setAuthValue] = useState(null);

  return (
    <Context.Provider value={{ authValue, setAuthValue }}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
