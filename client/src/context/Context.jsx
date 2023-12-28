import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authValue, setAuthValue] = useState(null);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();
  const [modal, setModal] = useState(null);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displaySidebar, setDisplaySidebar] = useState(true);

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

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authValue,
        setAuthValue,
        boards,
        setBoards,
        board,
        setBoard,
        modal,
        openModal,
        closeModal,
        displaySettings,
        setDisplaySettings,
        displaySidebar,
        setDisplaySidebar,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
