import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

export default function LogoutPage() {
  const { setIsLoggedIn, setIsDarkMode } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        await axios.get('/api/logout', { withCredentials: true });

        setIsLoggedIn(false);
        setIsDarkMode(true);
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
    <section className="text-white bg-veryDarkGrey h-screen relative pt-16 md:pt-20">
      Logging out...
    </section>
  );
}
