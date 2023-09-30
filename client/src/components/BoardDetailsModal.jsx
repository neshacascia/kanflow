import { useState, useContext } from 'react';
import { Context } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BoardDetailsModal() {
  const { boardDetails, setBoardDetails } = useContext(Context);

  const [boardColumns, setBoardColumns] = useState([
    { id: 0, columnName: 'Todo' },
    { id: 1, columnName: 'Doing' },
  ]);

  function addNewColumn() {
    const maxId = Math.max(...boardColumns.map(column => column.id));

    const newColumn = {
      id: maxId + 1,
      columnName: '',
    };

    setBoardColumns([...boardColumns, newColumn]);
  }

  function updateColumnName(id, key, value) {
    setBoardColumns(
      boardColumns.map(column => {
        if (column.id === id) {
          return {
            ...column,
            [key]: value,
          };
        } else {
          return column;
        }
      })
    );
  }

  function deleteColumnName(id) {
    setBoardColumns(boardColumns.filter(column => column.id !== id));
  }

  return (
    <div>
      <FontAwesomeIcon icon={faXmark} onClick={() => setBoardDetails(null)} />
      <h2>{boardDetails === 'new' ? 'Add New' : 'Edit'} Board</h2>

      <form action="/board/createBoard" method="POST">
        <label>
          Board Name{' '}
          <input type="text" name="boardName" placeholder="e.g. Web Design" />
        </label>

        <label>
          Board Columns
          {boardColumns.map(column => (
            <div>
              <input
                key={column.id}
                type="text"
                name="columnName"
                value={column.columnName}
                onChange={e =>
                  updateColumnName(column.id, 'columnName', e.target.value)
                }
              />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => deleteColumnName(column.id)}
              />
            </div>
          ))}
        </label>

        <button type="button" onClick={addNewColumn}>
          + Add New Column
        </button>
        <button type="submit">
          {boardDetails === 'new' ? 'Create New Board' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
