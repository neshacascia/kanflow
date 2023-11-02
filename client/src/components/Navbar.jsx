import { useContext, useState } from 'react';
import { Context } from '../context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const {
    isLoggedIn,
    setDisplayMenuModal,
    setBoardDetails,
    setDisplayTaskModal,
  } = useContext(Context);

  const [displaySettings, setDisplaySettings] = useState(false);

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
    <nav>
      {isLoggedIn && (
        <span>
          <h2 onClick={displayMenu}>Boards</h2>
          <FontAwesomeIcon icon={faPlus} onClick={displayTask} />
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setDisplaySettings(true)}
          />
        </span>
      )}

      {displaySettings && (
        <div>
          <button>Delete Board</button>
        </div>
      )}
    </nav>
  );
}
