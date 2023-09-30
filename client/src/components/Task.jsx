export default function Task({ task, setViewTask, setSelectedStatus }) {
  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

  function handleTaskClick(status) {
    setSelectedStatus(status);
    setViewTask(task);
  }

  return (
    <div onClick={() => handleTaskClick(task.status)}>
      <p>{task.title}</p>
      <span>{`${completedSubtasks} of ${task.subtasks.length} subtasks`}</span>
    </div>
  );
}
