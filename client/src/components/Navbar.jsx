import { useContext, useState } from 'react';
import { Context } from '../context/Context';

import logo from '../assets/logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPlus,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const {
    board,
    displayMenuModal,
    setDisplayMenuModal,
    setBoardDetails,
    setDisplayTaskModal,
  } = useContext(Context);

  const [displaySettings, setDisplaySettings] = useState(false);
  const user = localStorage.getItem('user');

  function displayMenu() {
    setBoardDetails(null);

    displayMenuModal === true
      ? setDisplayMenuModal(false)
      : setDisplayMenuModal(true);
  }

  function displayTask() {
    setDisplayMenuModal(false);
    setBoardDetails(null);

    setDisplayTaskModal('add');
  }

  return (
    <nav className="bg-darkGrey h-16 px-4">
      {user && (
        <span className="h-full flex items-center">
          <img src={logo} />
          <div
            onClick={displayMenu}
            className="flex items-center gap-2 ml-4 mr-auto"
          >
            <h2 className="text-white text-lg font-semibold">{board?.name}</h2>
            {displayMenuModal === true ? (
              <FontAwesomeIcon icon={faAngleUp} className="text-mainPurple " />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} className="text-mainPurple" />
            )}
          </div>
          <div className="bg-mainPurple w-12 h-8 flex items-center justify-center rounded-3xl mr-4">
            <FontAwesomeIcon
              icon={faPlus}
              onClick={displayTask}
              className="text-white"
            />
          </div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setDisplaySettings(true)}
            className="text-mediumGray text-lg"
          />
        </span>
      )}

      {displaySettings && (
        <div>
          <button onClick={() => setBoardDetails('editBoard')}>
            Edit Board
          </button>
          <button onClick={() => setDisplayTaskModal('deleteBoard')}>
            Delete Board
          </button>
        </div>
      )}
    </nav>
  );
}
