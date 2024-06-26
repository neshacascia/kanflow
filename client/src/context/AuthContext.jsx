import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        storeAuthValue,
        changeAuthValue,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
