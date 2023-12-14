import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);
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
    } else if (modal === 'new') {
      setModal('new');
    } else if (modal === 'add') {
      setModal('add');
    } else if (modal === 'edit') {
      setModal('edit');
    } else if (modal === 'viewTask') {
      setModal('viewTask');
    } else if (modal === 'deleteTask') {
      setModal('deleteTask');
    } else if (modal === 'deleteBoard') {
      setModal('deleteBoard');
    }
  }

  function closeModal() {
    setModal(null);
  }

  console.log(modal);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authValue,
        setAuthValue,
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
