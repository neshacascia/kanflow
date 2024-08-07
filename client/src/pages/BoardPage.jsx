import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BoardContext } from '../context/BoardContext';
import { UIContext } from '../context/UIContext';
import Board from '@components/board/Board';
import WelcomeMessage from '@components/board/WelcomeMessage';
import UserProfile from '@components/profile/UserProfile';
import { baseURL } from '../api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function BoardPage() {
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const [boardPageUpdated, setBoardPageUpdated] = useState(false);
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const { setBoards, modal } = useContext(BoardContext);
  const { setDisplaySidebar } = useContext(UIContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBoards() {
      try {
        const res = await axios.get(`${baseURL}/board/getBoards`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { user, boards } = res.data;

        if (user) {
          setIsLoggedIn(true);
          localStorage.setItem('user', true);
          setUser(user);
          setBoards(boards);

          if (boards.length > 0) {
            navigate(`/board/${boards[0]._id}`);
          } else {
            setWelcomeMessage(true);
          }
        } else {
          localStorage.removeItem('user');
          setUser(null);
          navigate('/');
          console.log('User is not logged in');
        }
      } catch (err) {
        console.error(err);
      }
    }

    getBoards();
  }, [boardPageUpdated]);

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
      {modal === 'userProfile' && (
        <UserProfile user={user} setBoardPageUpdated={setBoardPageUpdated} />
      )}
    </section>
  );
}
