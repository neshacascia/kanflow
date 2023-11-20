import { useState, useContext } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BoardDetailsModal({ board }) {
  const { boardDetails, setBoardDetails } = useContext(Context);

  const [boardColumns, setBoardColumns] = useState(
    board?.columns || [
      { id: 0, columnName: 'Todo' },
      { id: 1, columnName: 'Doing' },
    ]
  );

  function addNewColumn() {
    if (boardDetails === 'new') {
      const maxId = Math.max(...boardColumns.map(column => column.id));

      const newColumn = {
        id: maxId + 1,
        columnName: '',
      };

      setBoardColumns([...boardColumns, newColumn]);
    } else {
      setBoardColumns(prevState => {
        return [...prevState, ''];
      });
    }
  }

  function updateColumnName(id, key, value) {
    setBoardColumns(prevState =>
      prevState.map(column => {
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
    setBoardColumns(prevState => prevState.filter(column => column.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('boardName');
    const columns = formData.getAll('columnName');

    const boardData = {
      name,
      columns,
    };

    try {
      if (boardDetails === 'new') {
        const res = axios.post('/board/createBoard', { boardData });
        if (res.status === 200) {
          setBoardDetails(null);
          navigate(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log(boardColumns);
  return (
    <div>
      <FontAwesomeIcon icon={faXmark} onClick={() => setBoardDetails(null)} />
      <h2>{boardDetails === 'new' ? 'Add New' : 'Edit'} Board</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Board Name{' '}
          <input
            type="text"
            name="boardName"
            placeholder="e.g. Web Design"
            value={boardDetails === 'editBoard' ? board.name : null}
          />
        </label>

        <label>
          Board Columns
          {boardColumns.map(column => (
            <div>
              <input
                key={column.id}
                type="text"
                name="columnName"
                value={boardDetails === 'new' ? column.columnName : column}
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
