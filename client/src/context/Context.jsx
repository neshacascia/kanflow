import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();
  const [modal, setModal] = useState(null);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displaySidebar, setDisplaySidebar] = useState(true);

  function storeAuthValue(value) {
    if (value === 'Signup') {
      localStorage.setItem('authValue', 'Signup');
    } else if (value === 'Login') {
      localStorage.setItem('authValue', 'Login');
    }
  }

  function changeAuthValue(value) {
    if (value === 'Signup') {
      localStorage.setItem('authValue', 'Login');
    } else if (value === 'Login') {
      localStorage.setItem('authValue', 'Signup');
    }
  }

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
        storeAuthValue,
        changeAuthValue,
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
