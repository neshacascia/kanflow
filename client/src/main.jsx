import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { BoardContextProvider } from './context/BoardContext.jsx';
import { UIContextProvider } from './context/UIContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BoardContextProvider>
      <UIContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UIContextProvider>
    </BoardContextProvider>
  </AuthContextProvider>
);
