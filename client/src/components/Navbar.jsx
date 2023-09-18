import { useContext } from 'react';
import { Context } from '../context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { isLoggedIn, setDisplayMenuModal, setBoardDetails } =
    useContext(Context);

  function displayMenu() {
    setBoardDetails(null);
    setDisplayMenuModal(true);
  }

  return (
    <nav>
      {isLoggedIn && (
        <span>
          <FontAwesomeIcon icon={faPlus} />
          <FontAwesomeIcon icon={faEllipsisVertical} onClick={displayMenu} />
        </span>
      )}
    </nav>
  );
}
