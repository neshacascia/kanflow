export default function Column({ name, tasks }) {
  const columnTasks = tasks.filter(task => task.status === name);

  return (
    <section>
      <h3>{`${name} (${columnTasks.length})`}</h3>
    </section>
  );
}
