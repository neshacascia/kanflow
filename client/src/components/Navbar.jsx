import { useContext, useState } from 'react';
import { Context } from '../context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPlus,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const {
    displayMenuModal,
    setDisplayMenuModal,
    setBoardDetails,
    setDisplayTaskModal,
  } = useContext(Context);

  const [displaySettings, setDisplaySettings] = useState(false);
  const user = localStorage.getItem('user');

  function displayMenu() {
    setBoardDetails(null);
    setDisplayMenuModal(true);
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
          <h2 onClick={displayMenu} className="text-white text-lg">
            Boards
          </h2>

          <FontAwesomeIcon icon={faPlus} onClick={displayTask} />
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setDisplaySettings(true)}
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
