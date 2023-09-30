export default function ViewTaskModal({ task, columns, selectedStatus }) {
  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

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
            <input type="checkbox" /> {subtask.subtask}
          </li>
        ))}
      </ul>

      <label>
        Current Status
        <select name="status">
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
