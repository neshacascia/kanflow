export default function Task({
  task,
  setViewTask,
  setSelectedStatus,
  openModal,
}) {
  const completedSubtasks = task.subtasks.filter(
    task => task.completed === true
  ).length;

  function handleTaskClick(status) {
    setSelectedStatus(status);
    setViewTask(task);
    openModal('viewTask');
  }

  return (
    <div
      onClick={() => handleTaskClick(task.status)}
      className="bg-darkGrey w-[280px] flex flex-col gap-2 rounded-lg shadow-task py-6 px-4 cursor-pointer"
    >
      <p className="text-white text-sm font-medium tracking-[0.015em]">
        {task.title}
      </p>
      <span className="text-mediumGrey text-xs font-medium">{`${completedSubtasks} of ${task.subtasks.length} subtasks`}</span>
    </div>
  );
}
