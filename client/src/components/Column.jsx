import Task from './Task';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Column({
  name,
  tasks,
  setViewTask,
  setSelectedStatus,
}) {
  const columnTasks = tasks.filter(task => task.status === name);

  return (
    <section>
      <div className="flex gap-3">
        <FontAwesomeIcon icon={faCircle} className="w-[15px] h-[15px]" />
        <h3 className="text-mediumGrey text-xs font-medium uppercase tracking-widest mb-6">{`${name} (${columnTasks.length})`}</h3>
      </div>

      <div className="flex flex-col gap-5">
        {columnTasks.map((task, ind) => (
          <Task
            key={ind}
            task={task}
            setViewTask={setViewTask}
            setSelectedStatus={setSelectedStatus}
          />
        ))}
      </div>
    </section>
  );
}
