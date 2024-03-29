import { createContext, useState, useEffect } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();
  const [boardIndex, setBoardIndex] = useState();
  const [modal, setModal] = useState(null);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displaySidebar, setDisplaySidebar] = useState(true);

  const initialTheme = localStorage.getItem('theme') || 'dark';
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleTheme() {
    setIsDarkMode(prevState => !prevState);
  }

  function storeAuthValue(value) {
    if (value === 'signup') {
      localStorage.setItem('authValue', 'signup');
    } else if (value === 'login') {
      localStorage.setItem('authValue', 'login');
    }
  }

  function changeAuthValue(value) {
    if (value === 'signup') {
      localStorage.setItem('authValue', 'login');
    } else if (value === 'login') {
      localStorage.setItem('authValue', 'signup');
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
        boardIndex,
        setBoardIndex,
        modal,
        openModal,
        closeModal,
        displaySettings,
        setDisplaySettings,
        displaySidebar,
        setDisplaySidebar,
        toggleTheme,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
