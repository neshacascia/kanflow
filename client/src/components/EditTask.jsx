import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditTask({ id, selectedTask, columns, closeModal }) {
  const navigate = useNavigate();

  const [task, setTask] = useState(selectedTask);
  const [subtasks, setSubtasks] = useState(task.subtasks);

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
      { id: maxId + 1, subtask: '', completed: false, isTouched: false },
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

    const taskData = {
      id,
      taskId: task._id,
      title,
      description,
      subtasks,
      status,
    };

    try {
      const res = await axios.put('/api/board/editTask', {
        taskData,
      });
      console.log(res);
      if (res.status === 200) {
        closeModal();
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal>
      <div className="bg-darkGrey w-[343px] relative flex flex-col rounded-md p-6">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeModal}
          className="text-mediumGrey w-5 h-5 absolute right-0 mr-4 cursor-pointer"
        />
        <h2 className="text-white text-lg font-semibold mb-6">Edit Task</h2>

        <form onSubmit={editTask} className="flex flex-col gap-6">
          <label className="text-white text-xs font-semibold flex flex-col gap-2">
            Title
            <input
              type="text"
              name="title"
              placeholder="e.g. Take coffee break"
              value={task.title}
              onChange={e => handleInputChange('title', e.target.value)}
              className="bg-transparent text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4"
            />
          </label>

          <label className="text-white text-xs font-semibold flex flex-col gap-2">
            Description
            <textarea
              name="desc"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              value={task.description}
              onChange={e => handleInputChange('description', e.target.value)}
              className="bg-transparent text-white text-[13px] font-light leading-6 h-[112px] border-[1px] rounded border-borderGrey py-2 px-4"
            ></textarea>
          </label>

          <label className="text-white text-xs font-semibold flex flex-col gap-2">
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
                  className={`bg-transparent text-white text-[13px] font-light leading-6 w-full border-[1px] rounded border-borderGrey py-2 px-4 ${
                    (item.isTouched === false) & (item.subtask.length === 0)
                      ? 'border-borderGrey'
                      : 'invalid:border-deleteRed'
                  }`}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => deleteSubtask(item.id)}
                  className="text-mediumGrey w-5 h-5 cursor-pointer"
                />
              </div>
            ))}
          </label>

          <button
            type="button"
            onClick={addNewSubtask}
            className="text-mainPurple bg-white text-[13px] font-semibold leading-6 rounded-[20px] py-3"
          >
            + Add New Subtask
          </button>

          <label className="text-white text-xs font-semibold flex flex-col gap-2">
            Status{' '}
            <select
              name="status"
              className="text-white bg-transparent text-[13px] font-light leading-6 w-full border-[1px] rounded border-borderGrey py-2 px-4"
            >
              {columns.map((status, ind) => (
                <option key={ind} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="text-white bg-mainPurple text-[13px] font-semibold leading-6 rounded-[20px] py-3"
          >
            Update Task
          </button>
        </form>
      </div>
    </Modal>
  );
}
