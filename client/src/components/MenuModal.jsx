import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MenuModal({ setDisplayMenuModal }) {
  return (
    <div>
      <h3>All Boards</h3>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => setDisplayMenuModal(false)}
      />

      <Link>+ Create New Board</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
