import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BoardPage from './pages/BoardPage';
import Board from './components/board/Board';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
