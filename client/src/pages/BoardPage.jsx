import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';

export default function BoardPage() {
  const { setUser } = useContext(Context);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get('/board/user', { withCredentials: true });
        setUser(res.data.user.userName);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    }

    fetchUserData();
  }, []);

  return <h1>Platform Launch Board</h1>;
}
