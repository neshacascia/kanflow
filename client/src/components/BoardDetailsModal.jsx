import { useState, useContext } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BoardDetailsModal({ board }) {
  const { boardDetails, setBoardDetails } = useContext(Context);

  const [boardName, setBoardName] = useState(board?.name || '');

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

  function updateBoardName(value) {
    setBoardName(value);
  }

  function updateColumnName(id, key, value) {
    if (boardDetails === 'new') {
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
    } else {
      setBoardColumns(prevState => {
        return prevState.map((column, ind) => {
          if (ind === id) {
            return value;
          } else {
            return column;
          }
        });
      });
    }
  }

  function deleteColumnName(id) {
    if (boardDetails === 'new') {
      setBoardColumns(prevState =>
        prevState.filter(column => column.id !== id)
      );
    } else {
      setBoardColumns(prevState =>
        prevState.filter((column, ind) => id !== ind)
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('boardName');
    const columns = formData.getAll('columnName');

    const boardData = {
      id: board?._id,
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
      } else {
        const res = axios.put('/board/editBoard', { boardData });
        if (res.status === 200) {
          setBoardDetails(null);
          navigate(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

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
            value={boardName}
            onChange={e => updateBoardName(e.target.value)}
          />
        </label>

        <label>
          Board Columns
          {boardColumns.map((column, ind) => (
            <div>
              <input
                key={column.id}
                type="text"
                name="columnName"
                value={boardDetails === 'new' ? column.columnName : column}
                onChange={e =>
                  updateColumnName(
                    column.id || ind,
                    'columnName',
                    e.target.value
                  )
                }
              />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => deleteColumnName(column.id || ind)}
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
