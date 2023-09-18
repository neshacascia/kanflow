import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);
  const [displayMenuModal, setDisplayMenuModal] = useState(false);
  const [boardDetails, setBoardDetails] = useState(null);
  const [displayTasksModal, setDisplayTasksModal] = useState(false);
  const [boards, setBoards] = useState([]);

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
        displayTasksModal,
        setDisplayTasksModal,
        boards,
        setBoards,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
