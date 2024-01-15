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
    <section className="text-white bg-veryDarkGrey font-semibold text-lg w-screen h-screen relative flex flex-col justify-center items-center pt-16 md:pt-20">
      <p>Logging out...</p>
      <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
      </div>
    </section>
  );
}
