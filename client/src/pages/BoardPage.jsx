import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import Board from '../components/Board';

export default function BoardPage() {
  const { setIsLoggedIn, setBoards } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBoards() {
      try {
        const res = await axios.get('/api/board/getBoards', {
          withCredentials: true,
        });

        const { user, boards } = res.data;

        if (user) {
          setIsLoggedIn(true);
          localStorage.setItem('user', true);
          setBoards(boards);
          navigate(`/board/${boards[0]._id}`);
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
