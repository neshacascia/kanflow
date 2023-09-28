export default function Task({ task }) {
  return (
    <div>
      <p>{task.title}</p>
      <span>{`of ${task.subtasks.length} subtasks`}</span>
    </div>
  );
}
