import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BoardContext } from '../context/BoardContext';
import { UIContext } from '../context/UIContext';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { baseURL } from '../api';

export default function LogoutPage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setBoards, setBoard } = useContext(BoardContext);
  const { setIsDarkMode } = useContext(UIContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        await axios.get(`${baseURL}/logout`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setIsLoggedIn(false);
        setIsDarkMode(true);
        setBoards([]);
        setBoard();
        localStorage.removeItem('user');
        console.log('User logged out successfully');
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }

    logout();
  }, []);

  return (
    <section className="text-white bg-veryDarkGrey font-semibold text-lg w-screen h-screen relative flex flex-col justify-center items-center pt-16 md:pt-20">
      <p>Logging out...</p>
      <LoadingSpinner />
    </section>
  );
}
