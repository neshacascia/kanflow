import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function ViewTaskModal({ task, columns, selectedStatus }) {
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
      const res = await axios.put('/board/updateStatus', {
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
    <div>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        onClick={() => setSettingsModal(true)}
      />
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      <span>
        Subtasks ({`${completedSubtasks} of ${task.subtasks.length}`})
      </span>

      <ul>
        {subtasks.map((subtask, ind) => (
          <li key={ind}>
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

      <label>
        Current Status
        <select
          name="status"
          onChange={e => updateCurrentStatus(e.target.value)}
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
