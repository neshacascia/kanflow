import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

export default function HomePage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(Context);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const res = await axios.get('/user', { withCredentials: true });
        const { user } = res.data;

        if (user) {
          setIsLoggedIn(true);
          navigate('/board');
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkAuthentication();
  }, []);

  return (
    <>
      <h1>Unleash Your Productivity with kanflow</h1>
    </>
  );
}
