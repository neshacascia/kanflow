import { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';

export default function BoardPage() {
  const { setIsLoggedIn } = useContext(Context);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const res = await axios.get('/user', { withCredentials: true });
        const { user } = res.data;

        if (user) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkAuthentication();
  }, []);

  return <h1>Platform Launch Board</h1>;
}
