import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function ViewTask({ task, columns, selectedStatus }) {
  const { setDisplayTaskModal } = useContext(Context);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [settingsModal, setSettingsModal] = useState(false);

  const navigate = useNavigate();
  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

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
    <div className="bg-darkGrey w-[343px] rounded-md p-6">
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
            className="text-white bg-veryDarkGrey text-xs font-semibold flex items-center gap-4 rounded px-3 py-5"
          >
            <input
              type="checkbox"
              id={subtask.id}
              onChange={() =>
                setCompletionStatus(subtask.id, subtask.completed)
              }
              checked={subtask.completed}
            />{' '}
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
        <div>
          <button onClick={() => setDisplayTaskModal('edit')}>Edit Task</button>
          <button onClick={() => setDisplayTaskModal('deleteTask')}>
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
}
