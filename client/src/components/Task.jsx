export default function Task({ task }) {
  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

  return (
    <div>
      <p>{task.title}</p>
      <span>{`${completedSubtasks} of ${task.subtasks.length} subtasks`}</span>
    </div>
  );
}
