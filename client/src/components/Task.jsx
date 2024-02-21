import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Task({
  task,
  setViewTask,
  setSelectedStatus,
  openModal,
}) {
  const [taskHovered, setTaskHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
      data: {
        type: 'task',
      },
    });

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
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
      {...listeners}
      onClick={() => handleTaskClick(task.status)}
      onMouseOver={() => setTaskHovered(true)}
      onMouseLeave={() => setTaskHovered(false)}
      className="bg-white dark:bg-darkGrey w-[280px] flex flex-col gap-2 rounded-lg shadow-lightTask dark:shadow-task py-6 px-4 cursor-pointer hover:text-mainPurple"
    >
      <p
        className={`text-sm font-medium tracking-[0.015em] ${
          taskHovered ? 'text-mainPurple' : 'text-lightBlack dark:text-white'
        }`}
      >
        {task.title}
      </p>
      <span className="text-mediumGrey text-xs font-medium">{`${completedSubtasks} of ${task.subtasks.length} subtasks`}</span>
    </div>
  );
}
