import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);
  const [displayMenuModal, setDisplayMenuModal] = useState(false);
  const [boardDetails, setBoardDetails] = useState(null);
  const [displayTaskModal, setDisplayTaskModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();

  const [modal, setModal] = useState(null);

  function openModal(modal) {
    setModal(null);

    if (modal === 'menu') {
      setModal('menu');
    } else if (modal === 'editBoard') {
      setModal('editBoard');
    }
  }

  function closeModal() {
    setModal(null);
  }

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
        modal,
        openModal,
        closeModal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
