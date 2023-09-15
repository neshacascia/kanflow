import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MenuModal({ setDisplayMenuModal, setBoardDetails }) {
  function displayBoard(type) {
    if (type === 'new') {
      setBoardDetails('new');
    }

    setDisplayMenuModal(false);
  }

  return (
    <div>
      <h3>All Boards</h3>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => setDisplayMenuModal(false)}
      />

      <button onClick={() => displayBoard('new')}>+ Create New Board</button>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
