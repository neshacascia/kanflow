import { useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  MemoryRouter,
} from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Context } from './context/Context';
import Root from './components/Root';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BoardPage from './pages/BoardPage';
import Board from './components/Board';
import LogoutPage from './pages/LogoutPage';
import Sidebar from './components/Sidebar';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <AuthPage /> },
      { path: 'signup', element: <AuthPage /> },
      { path: 'board', element: <BoardPage /> },
      { path: 'board/:id', element: <Board /> },
      { path: 'logout', element: <LogoutPage /> },
    ],
  },
]);

function App() {
  const { displaySidebar } = useContext(Context);

  return (
    <>
      <RouterProvider router={router} />
      {displaySidebar &&
        createPortal(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>,
          document.getElementById('overlay-root')
        )}
    </>
  );
}

export default App;
