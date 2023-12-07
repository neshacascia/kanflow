import Task from './Task';

export default function Column({
  name,
  tasks,
  setViewTask,
  setSelectedStatus,
}) {
  const columnTasks = tasks.filter(task => task.status === name);

  return (
    <section>
      <h3>{`${name} (${columnTasks.length})`}</h3>
      {columnTasks.map((task, ind) => (
        <Task
          key={ind}
          task={task}
          setViewTask={setViewTask}
          setSelectedStatus={setSelectedStatus}
        />
      ))}
    </section>
  );
}
