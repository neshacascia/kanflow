import { useContext } from 'react';
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

  function displayMenu() {
    setBoardDetails(null);
    setDisplayMenuModal(true);
  }

  function displayTask() {
    setDisplayMenuModal(false);
    setBoardDetails(null);

    setDisplayTaskModal(true);
  }

  return (
    <nav>
      {isLoggedIn && (
        <span>
          <FontAwesomeIcon icon={faPlus} onClick={displayTask} />
          <FontAwesomeIcon icon={faEllipsisVertical} onClick={displayMenu} />
        </span>
      )}
    </nav>
  );
}
