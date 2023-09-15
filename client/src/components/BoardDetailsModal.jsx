import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BoardDetailsModal({ boardDetails, setBoardDetails }) {
  return (
    <div>
      <FontAwesomeIcon icon={faXmark} onClick={() => setBoardDetails(null)} />
      <h2>{boardDetails === 'new' ? 'Add New' : 'Edit'} Board</h2>
    </div>
  );
}
