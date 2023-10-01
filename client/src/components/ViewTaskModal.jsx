import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewTaskModal({ task, columns, selectedStatus }) {
  const navigate = useNavigate();
  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

  async function setCompletionStatus(id, completed) {
    try {
      const res = await axios.put('/board/setCompletionStatus', {
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
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      <span>
        Subtasks ({`${completedSubtasks} of ${task.subtasks.length}`})
      </span>

      <ul>
        {task.subtasks.map(subtask => (
          <li>
            <input
              type="checkbox"
              id={subtask.id}
              onChange={() =>
                setCompletionStatus(subtask.id, subtask.completed)
              }
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
          {columns.map(status => {
            if (status !== selectedStatus) {
              return <option value={status}>{status}</option>;
            }
          })}
        </select>
      </label>
    </div>
  );
}
