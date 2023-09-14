import { useContext } from 'react';
import { Context } from '../context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { isLoggedIn, setDisplayMenuModal } = useContext(Context);

  return (
    <nav>
      {isLoggedIn && (
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={() => setDisplayMenuModal(true)}
        />
      )}
    </nav>
  );
}
