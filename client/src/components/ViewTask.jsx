import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
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
  openModal,
  closeModal,
}) {
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [settingsModal, setSettingsModal] = useState(false);

  const navigate = useNavigate();
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
      const res = await axios.put('/api/board/updateStatus', {
        taskId: task._id,
        status: newStatus,
      });
      console.log(res);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal>
      <div
        className="bg-darkGrey w-[343px] flex flex-col rounded-md p-6"
        onClick={() => (settingsModal ? setSettingsModal(false) : null)}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-semibold">{task.title}</h2>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setSettingsModal(true)}
            className="text-mediumGrey text-xl"
          />
        </div>
        <p className="text-mediumGrey text-[13px] leading-6 mb-6">
          {task.description}
        </p>

        <span className="text-white text-xs font-semibold">
          Subtasks ({`${completedSubtasks} of ${task.subtasks.length}`})
        </span>

        <ul className="flex flex-col gap-2 my-4">
          {subtasks.map((subtask, ind) => (
            <li
              key={ind}
              className={`bg-veryDarkGrey text-xs font-semibold flex items-center gap-4 rounded px-3 py-4 ${
                subtask.completed ? 'text-white/50 line-through' : 'text-white'
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
                  className="w-4 h-4"
                />
              )}
              {subtask.subtask}
            </li>
          ))}
        </ul>

        <label className="text-white text-xs font-semibold flex flex-col mb-2">
          Current Status
          <select
            name="status"
            onChange={e => updateCurrentStatus(e.target.value)}
            className="bg-transparent text-white text-[13px] font-light border-[1px] rounded border-borderGrey py-3 px-4 mt-2"
          >
            <option value={selectedStatus}>{selectedStatus}</option>
            {columns.map((status, ind) => {
              if (status !== selectedStatus) {
                return (
                  <option key={ind} value={status}>
                    {status}
                  </option>
                );
              }
            })}
          </select>
        </label>

        {settingsModal && (
          <div className="bg-veryDarkGrey text-xs font-light leading-6 w-[150px] flex flex-col items-start gap-4 absolute right-5 rounded-lg shadow-glow p-4 mt-8">
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
