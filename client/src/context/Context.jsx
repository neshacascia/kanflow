import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);
  const [displayMenuModal, setDisplayMenuModal] = useState(false);
  const [boardDetails, setBoardDetails] = useState(null);
  const [displayTaskModal, setDisplayTaskModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();

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
        displayTaskModal,
        setDisplayTaskModal,
        boards,
        setBoards,
        board,
        setBoard,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
