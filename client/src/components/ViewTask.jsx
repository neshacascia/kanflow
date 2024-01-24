import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function ViewTask({
  task,
  columns,
  selectedStatus,
  setIsBoardUpdated,
  openModal,
  closeModal,
}) {
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [settingsModal, setSettingsModal] = useState(false);

  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

  function updateModal(modalType) {
    closeModal();
    openModal(modalType);
  }

  async function setCompletionStatus(id, completed) {
    try {
      const updatedSubtasks = subtasks.map(subtask => {
        if (subtask.id === id) {
          return { ...subtask, completed: !completed };
        }
        return subtask;
      });

      setSubtasks(updatedSubtasks);
      setIsBoardUpdated(true);

      const res = await axios.put('/api/board/setCompletionStatus', {
        taskId: task._id,
        subtaskId: id,
        completed: completed,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateCurrentStatus(newStatus) {
    try {
      const res = await axios.put(
        '/api/board/updateStatus',
        {
          taskId: task._id,
          status: newStatus,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setIsBoardUpdated(true);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal>
      <div
        className="bg-white dark:bg-darkGrey w-[343px] h-auto flex flex-col rounded-md p-6 overflow-y-auto md:w-[480px] md:p-8"
        onClick={() => (settingsModal ? setSettingsModal(false) : null)}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lightBlack dark:text-white text-lg font-semibold">
            {task.title}
          </h2>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setSettingsModal(true)}
            className="text-mediumGrey text-xl cursor-pointer pl-4"
          />
        </div>
        <p className="text-mediumGrey text-[13px] leading-6 mb-6">
          {task.description}
        </p>

        <span className="text-mediumGrey dark:text-white text-xs font-semibold">
          Subtasks ({`${completedSubtasks} of ${task.subtasks.length}`})
        </span>

        <ul className="flex flex-col gap-2 my-4">
          {subtasks.map((subtask, ind) => (
            <li
              key={ind}
              className={`bg-lightGrey dark:bg-veryDarkGrey text-xs font-semibold flex items-center gap-4 rounded px-3 py-4 hover:bg-mainPurple dark:hover:bg-mainPurple hover:bg-opacity-25 dark:hover:bg-opacity-25 hover:cursor-pointer ${
                subtask.completed
                  ? 'text-lightBlack/50 dark:text-white/50 line-through'
                  : 'text-lightBlack dark:text-white'
              }`}
            >
              {subtask.completed ? (
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  id={subtask.id}
                  onClick={() =>
                    setCompletionStatus(subtask.id, subtask.completed)
                  }
                  checked={subtask.completed}
                  className="text-mainPurple w-4 h-4"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSquare}
                  id={subtask.id}
                  onClick={() =>
                    setCompletionStatus(subtask.id, subtask.completed)
                  }
                  checked={subtask.completed}
                  className="text-white w-4 h-4 border-lightCheckbox border rounded"
                />
              )}
              {subtask.subtask}
            </li>
          ))}
        </ul>

        <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col mb-2">
          Current Status
          <select
            name="status"
            onChange={e => updateCurrentStatus(e.target.value)}
            className="bg-transparent text-lightBlack dark:text-white text-[13px] font-light border-[1px] rounded border-borderGrey py-3 px-4 mt-2 hover:cursor-pointer "
          >
            <option value={selectedStatus}>
              {selectedStatus.split('')[0].toUpperCase() +
                selectedStatus.split('').slice(1).join('').toLowerCase()}
            </option>
            {columns.map((column, ind) => {
              if (column.columnName !== selectedStatus) {
                return (
                  <option key={ind} value={column.columnName}>
                    {column.columnName.split('')[0].toUpperCase() +
                      column.columnName
                        .split('')
                        .slice(1)
                        .join('')
                        .toLowerCase()}
                  </option>
                );
              }
            })}
          </select>
        </label>

        {settingsModal && (
          <div className="bg-white dark:bg-veryDarkGrey text-xs font-light leading-6 w-[150px] flex flex-col items-start gap-4 absolute transform translate-x-52 translate-y-1/4 rounded-lg shadow-lightSettings dark:shadow-glow p-4 mt-8 md:w-[192px] md:translate-x-80">
            <button
              onClick={() => updateModal('edit')}
              className="text-mediumGrey"
            >
              Edit Task
            </button>
            <button
              onClick={() => updateModal('deleteTask')}
              className="text-deleteRed"
            >
              Delete Task
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
