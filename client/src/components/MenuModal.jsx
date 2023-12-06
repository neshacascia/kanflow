import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MenuModal() {
  const { setBoardDetails, setDisplayMenuModal, boards } = useContext(Context);

  function displayBoard(type) {
    if (type === 'new') {
      setBoardDetails('new');
    }

    closeMenuModal();
  }

  function closeMenuModal() {
    setDisplayMenuModal(false);
  }

  return (
    <div>
      <h3>All Boards ({boards.length})</h3>
      {boards?.map((board, ind) => (
        <Link key={ind} to={`/board/${board._id}`} onClick={closeMenuModal}>
          {board.name}
        </Link>
      ))}
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => setDisplayMenuModal(false)}
      />

      <button onClick={() => displayBoard('new')}>+ Create New Board</button>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
