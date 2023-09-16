import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

export default function LogoutPage() {
  const { setIsLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        await axios.get('/logout', { withCredentials: true });
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }

    logout();
  }, []);

  return <div>Logging out...</div>;
}