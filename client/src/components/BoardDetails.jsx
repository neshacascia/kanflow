import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import Modal from './Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BoardDetails({ board, setIsBoardUpdated }) {
  const navigate = useNavigate();
  const { modal, closeModal } = useContext(Context);

  const boardDetails = modal;

  const [boardName, setBoardName] = useState(
    boardDetails === 'editBoard' ? board?.name : ''
  );

  const [boardNameInputTouched, setBoardNameInputTouched] = useState(false);

  const [boardColumns, setBoardColumns] = useState(
    boardDetails === 'editBoard'
      ? board?.columns
      : [
          { id: 0, columnName: 'Todo', isTouched: false },
          { id: 1, columnName: 'Doing', isTouched: false },
        ]
  );

  function columnInputBlurHandler(id) {
    setBoardColumns(prevState =>
      prevState.map(column => {
        if (column.id === id) {
          return {
            ...column,
            isTouched: true,
          };
        } else {
          return column;
        }
      })
    );
  }

  function addNewColumn() {
    const maxId = Math.max(...boardColumns.map(column => column.id));

    const newColumn = {
      id: maxId + 1,
      columnName: '',
      isTouched: false,
    };

    setBoardColumns([...boardColumns, newColumn]);
  }

  function updateBoardName(value) {
    setBoardName(value);
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
    const columns = boardColumns;

    const boardData = {
      id: board?._id,
      name,
      columns,
    };

    try {
      if (boardDetails === 'new') {
        const res = await axios.post(
          'https://kanflow-server.onrender.com/api/board/createBoard',
          { boardData }
        );
        const { boardId } = res.data;

        if (res.status === 200) {
          closeModal();
          navigate(`/board/${boardId}`);
        }
      } else {
        const res = await axios.put(
          'https://kanflow-server.onrender.com/api/board/editBoard',
          { boardData }
        );

        if (res.status === 200) {
          setIsBoardUpdated(true);
          closeModal();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal>
      <div className="bg-white dark:bg-darkGrey w-[343px] relative flex flex-col rounded-md p-6 md:w-[480px] md:p-8">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeModal}
          className="text-mediumGrey w-5 h-5 absolute right-0 mr-4 cursor-pointer"
        />
        <h2 className="text-lightBlack dark:text-white text-lg font-semibold mb-6">
          {boardDetails === 'new' ? 'Add New' : 'Edit'} Board
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
            Board Name{' '}
            <input
              type="text"
              name="boardName"
              placeholder="e.g. Web Design"
              value={boardName}
              required
              onChange={e => updateBoardName(e.target.value)}
              onBlur={() => setBoardNameInputTouched(true)}
              className={`bg-transparent text-lightBlack dark:text-white placeholder:text-lightBlack/25 dark:placeholder:text-white/25 text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                boardNameInputTouched
                  ? 'invalid:border-deleteRed'
                  : 'border-borderGrey'
              }`}
            />
          </label>

          <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
            Board Columns
            {boardColumns.map(column => (
              <div key={column.id} className="w-full flex items-center gap-4">
                <input
                  type="text"
                  name="columnName"
                  value={column.columnName}
                  required
                  onChange={e =>
                    updateColumnName(column.id, 'columnName', e.target.value)
                  }
                  onBlur={() => columnInputBlurHandler(column.id)}
                  className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 w-full border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                    (column.isTouched === false) &
                    (column.columnName.length === 0)
                      ? 'border-borderGrey'
                      : 'invalid:border-deleteRed'
                  }`}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => deleteColumnName(column.id)}
                  className="text-mediumGrey w-5 h-5 cursor-pointer hover:text-deleteRed"
                />
              </div>
            ))}
          </label>

          <button
            type="button"
            onClick={addNewColumn}
            className="text-mainPurple bg-lightPurple dark:bg-white text-[13px] font-semibold leading-6 rounded-[20px] py-3 hover:bg-lightPurple/25"
          >
            + Add New Column
          </button>

          <button
            type="submit"
            className="text-white bg-mainPurple text-[13px] font-semibold leading-6 rounded-[20px] py-3 hover:bg-mainPurpleHover"
          >
            {boardDetails === 'new' ? 'Create New Board' : 'Save Changes'}
          </button>
        </form>
      </div>
    </Modal>
  );
}
