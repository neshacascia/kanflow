import { createContext, useState, useEffect } from 'react';

const UIContext = createContext();

function UIContextProvider(props) {
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const [displayUserProfile, setDisplayUserProfile] = useState(false);

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

  return (
    <UIContext.Provider
      value={{
        displaySettings,
        setDisplaySettings,
        displaySidebar,
        setDisplaySidebar,
        toggleTheme,
        isDarkMode,
        setIsDarkMode,
        displayUserProfile,
        setDisplayUserProfile,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}

export { UIContext, UIContextProvider };
