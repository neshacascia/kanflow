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
    openModal,
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
      <span className="h-full flex items-center">
        <img src={logo} />
        {!user && (
          <p className="text-white text-lg font-semibold tracking-wide ml-4">
            kanflow
          </p>
        )}
        {user && (
          <div className="w-full flex items-center gap-2">
            <div
              onClick={() => openModal('menu')}
              className="flex items-center gap-2 ml-4 mr-auto cursor-pointer"
            >
              <h2 className="text-white text-lg font-semibold">
                {board?.name}
              </h2>
              {displayMenuModal === true ? (
                <FontAwesomeIcon
                  icon={faAngleUp}
                  className="text-mainPurple "
                />
              ) : (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="text-mainPurple"
                />
              )}
            </div>
            <button
              onClick={displayTask}
              disabled={board?.columns.length === 0}
              className="bg-mainPurple w-12 h-8 flex items-center justify-center rounded-3xl mr-4 disabled:opacity-25"
            >
              <FontAwesomeIcon icon={faPlus} className="text-white" />
            </button>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              onClick={() =>
                displaySettings
                  ? setDisplaySettings(false)
                  : setDisplaySettings(true)
              }
              className="text-mediumGrey text-lg cursor-pointer"
            />
          </div>
        )}
      </span>

      {displaySettings && (
        <div className="bg-veryDarkGrey text-xs font-light leading-6 w-[170px] flex flex-col items-start gap-4 absolute right-4 rounded-lg shadow-glow p-4 -mt-2">
          <button
            onClick={() => openModal('editBoard')}
            className="text-mediumGrey"
          >
            Edit Board
          </button>
          <button
            onClick={() => setDisplayTaskModal('deleteBoard')}
            className="text-deleteRed"
          >
            Delete Board
          </button>
        </div>
      )}
    </nav>
  );
}
