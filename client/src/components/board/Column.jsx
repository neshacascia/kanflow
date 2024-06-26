import Task from '@components/tasks/Task';
import { SortableContext } from '@dnd-kit/sortable';
import { DragOverlay, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Column({
  ind,
  name,
  tasks,
  setViewTask,
  setSelectedStatus,
  openModal,
  activeTask,
}) {
  const { setNodeRef } = useDroppable({ id: name });

  const dropAnimation = {
    keyframes({ transform }) {
      return [
        { transform: CSS.Transform.toString(transform.initial) },
        {
          transform: CSS.Transform.toString({
            ...transform.final,
            scaleX: 0.94,
            scaleY: 0.94,
          }),
        },
      ];
    },
    sideEffects({ active }) {
      active.node.style.opacity = '0';
    },
  };

  const columnTasks = tasks?.filter(task => task.status === name) || [];

  const columnColours = [
    'text-red-500',
    'text-orange-500',
    'text-amber-400',
    'text-green-500',
    'text-teal-500',
    'text-cyan-500',
    'text-purple-400',
  ];

  return (
    <section ref={setNodeRef} className="min-w-[280px] pr-4">
      <div className="flex gap-3">
        <FontAwesomeIcon
          icon={faCircle}
          className={`w-[15px] h-[15px] ${columnColours[ind]}`}
        />
        <h3 className="text-mediumGrey text-xs font-medium uppercase tracking-widest mb-6">{`${name} (${
          columnTasks ? columnTasks.length : ''
        })`}</h3>
      </div>

      <div className="flex flex-col gap-5 last:pb-8">
        <SortableContext items={columnTasks?.map(task => task._id)}>
          {columnTasks?.map((task, ind) => (
            <Task
              key={ind}
              task={task}
              setViewTask={setViewTask}
              setSelectedStatus={setSelectedStatus}
              openModal={openModal}
            />
          ))}
        </SortableContext>
        {activeTask && (
          <DragOverlay dropAnimation={dropAnimation}>
            <Task task={activeTask} />
          </DragOverlay>
        )}
      </div>
    </section>
  );
}
