import { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { baseURL } from '../api';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditTask({
  boardIndex,
  tasks,
  selectedTask,
  columns,
  selectedStatus,
  setIsBoardUpdated,
  closeModal,
}) {
  const [task, setTask] = useState(selectedTask);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [titleInputTouched, setTitleInputTouched] = useState(false);

  function handleInputChange(key, value) {
    setTask({ ...task, [key]: value });
  }

  function subtasksInputBlurHandler(id) {
    setSubtasks(prevState =>
      prevState.map(subtask => {
        if (subtask.id === id) {
          return {
            ...subtask,
            isTouched: true,
          };
        } else {
          return subtask;
        }
      })
    );
  }

  function addNewSubtask() {
    const maxId = Math.max(...subtasks.map(subtask => subtask.id));

    setSubtasks(prevState => [
      ...prevState,
      {
        id: subtasks.length >= 1 ? maxId + 1 : 0,
        subtask: '',
        completed: false,
        isTouched: false,
      },
    ]);
  }

  function updateSubtask(id, key, value) {
    setSubtasks(prevState =>
      prevState.map(subtask => {
        if (subtask.id === id) {
          return {
            ...subtask,
            [key]: value,
          };
        } else {
          return subtask;
        }
      })
    );
  }

  function deleteSubtask(id) {
    setSubtasks(prevState => prevState.filter(subtask => subtask.id !== id));
  }

  async function editTask(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('desc');
    const status = formData.get('status');
    const taskIndex = tasks.findIndex(task => selectedTask._id === task._id);

    const taskData = {
      boardIndex,
      taskIndex,
      _id: task._id,
      title,
      description,
      subtasks,
      status,
    };

    try {
      const res = await axios.put(
        `${baseURL}/board/editTask`,
        {
          taskData,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setIsBoardUpdated(true);
        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal>
      <div className="bg-white dark:bg-darkGrey w-[343px] h-[90vh] relative flex flex-col rounded-md p-6 overflow-y-auto md:w-[480px] md:p-8">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeModal}
          className="text-mediumGrey w-5 h-5 absolute right-0 mr-4 cursor-pointer"
        />
        <h2 className="text-lightBlack dark:text-white text-lg font-semibold mb-6">
          Edit Task
        </h2>

        <form onSubmit={editTask} className="flex flex-col gap-6">
          <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
            Title
            <input
              type="text"
              name="title"
              placeholder="e.g. Take coffee break"
              value={task.title}
              required
              onChange={e => handleInputChange('title', e.target.value)}
              onBlur={() => setTitleInputTouched(true)}
              className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                titleInputTouched
                  ? 'invalid:border-deleteRed'
                  : 'border-borderGrey'
              }`}
            />
          </label>

          <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
            Description
            <textarea
              name="desc"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              value={task.description}
              onChange={e => handleInputChange('description', e.target.value)}
              className="bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 h-[112px] border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple"
            ></textarea>
          </label>

          <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
            Subtasks{' '}
            {subtasks.map(item => (
              <div key={item.id} className="w-full flex items-center gap-4">
                <input
                  placeholder={item.placeholder}
                  name="subtask"
                  value={item?.subtask}
                  required
                  onChange={e =>
                    updateSubtask(item.id, 'subtask', e.target.value)
                  }
                  onBlur={() => subtasksInputBlurHandler(item.id)}
                  className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 w-full border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                    (item.isTouched === false) & (item.subtask.length === 0)
                      ? 'border-borderGrey'
                      : 'invalid:border-deleteRed'
                  }`}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => deleteSubtask(item.id)}
                  className="text-mediumGrey w-5 h-5 cursor-pointer hover:text-deleteRed"
                />
              </div>
            ))}
          </label>

          <button
            type="button"
            onClick={addNewSubtask}
            className="text-mainPurple bg-lightPurple dark:bg-white text-[13px] font-semibold leading-6 rounded-[20px] py-3 hover:bg-lightPurple/25"
          >
            + Add New Subtask
          </button>

          <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
            Status{' '}
            <select
              name="status"
              className="text-lightBlack dark:text-white bg-transparent text-[13px] font-light leading-6 w-full border-[1px] rounded border-borderGrey py-3 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple hover:cursor-pointer"
            >
              <option value={selectedStatus}>
                {selectedStatus.split('')[0].toUpperCase() +
                  selectedStatus.split('').slice(1).join('').toLowerCase()}
              </option>
              {columns.map((column, ind) => {
                if (column.columnName !== selectedStatus) {
                  return (
                    <option key={ind} value={column.columnName}>
                      {column.columnName.split('')[0].toUpperCase() +
                        column.columnName
                          .split('')
                          .slice(1)
                          .join('')
                          .toLowerCase()}
                    </option>
                  );
                }
              })}
            </select>
          </label>
          <button
            type="submit"
            className="text-white bg-mainPurple text-[13px] font-semibold leading-6 rounded-[20px] py-3 hover:bg-mainPurpleHover mb-6"
          >
            Update Task
          </button>
        </form>
      </div>
    </Modal>
  );
}
