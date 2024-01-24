import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import Board from '../components/Board';
import WelcomeMessage from '../components/WelcomeMessage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function BoardPage() {
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const { setIsLoggedIn, setBoards, setDisplaySidebar } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBoards() {
      try {
        const res = await axios.get('/api/board/getBoards', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { user, boards } = res.data;

        if (user) {
          setIsLoggedIn(true);
          localStorage.setItem('user', true);
          setBoards(boards);

          if (boards.length > 0) {
            navigate(`/board/${boards[0]._id}`);
          } else {
            setWelcomeMessage(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    getBoards();
  }, []);

  return (
    <section>
      {welcomeMessage ? <WelcomeMessage /> : <Board />}
      <button
        onClick={() => setDisplaySidebar(true)}
        className="hidden md:flex justify-center items-center bg-mainPurple w-14 h-12 fixed bottom-0 left-0 rounded-menuLink mb-8 hover:bg-mainPurpleHover"
      >
        <FontAwesomeIcon
          icon={faEye}
          className="text-white text-xs py-5 pr-2"
        />
      </button>
    </section>
  );
}
