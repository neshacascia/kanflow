import { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';
import Board from '../components/Board';

export default function BoardPage() {
  const { setIsLoggedIn, setBoards } = useContext(Context);

  useEffect(() => {
    async function getBoards() {
      try {
        const res = await axios.get('/board/getBoards', {
          withCredentials: true,
        });

        const { user, boards } = res.data;

        if (user) {
          setIsLoggedIn(true);
          localStorage.setItem('user', true);
          setBoards(boards);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getBoards();
  }, []);

  return (
    <main>
      <Board />
    </main>
  );
}
