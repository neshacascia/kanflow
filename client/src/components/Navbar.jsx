import { useContext } from 'react';
import { Context } from '../context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

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
        <FontAwesomeIcon icon={faEllipsisVertical} onClick={displayMenu} />
      )}
    </nav>
  );
}
