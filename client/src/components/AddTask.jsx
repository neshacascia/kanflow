import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddTask({ id, columns, closeModal }) {
  const navigate = useNavigate();

  const [subtasks, setSubtasks] = useState([
    { id: 0, placeholder: 'e.g. Make coffee', subtask: '', completed: false },
    {
      id: 1,
      placeholder: 'e.g. Drink coffee & smile',
      subtask: '',
      completed: false,
    },
  ]);

  function addNewSubtask() {
    const maxId = Math.max(...subtasks.map(subtask => subtask.id));

    setSubtasks(prevState => [
      ...prevState,
      { id: maxId + 1, subtask: '', completed: false },
    ]);
  }

  function updateSubtask(id, key, value) {
    setSubtasks(
      subtasks.map(subtask => {
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

  async function addNewTask(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('desc');
    const status = formData.get('status');

    const taskData = {
      id,
      title,
      description,
      subtasks,
      status,
    };

    try {
      const res = await axios.post('/api/board/addTask', {
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
        <h2 className="text-white text-lg font-semibold mb-6">Add New Task</h2>

        <form onSubmit={addNewTask} className="flex flex-col gap-6">
          <label className="text-white text-xs font-semibold flex flex-col gap-2">
            Title
            <input
              type="text"
              name="title"
              placeholder="e.g. Take coffee break"
              className="bg-transparent text-white placeholder:text-white/25 text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4"
            />
          </label>

          <label className="text-white text-xs font-semibold flex flex-col gap-2">
            Description
            <textarea
              name="desc"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              className="bg-transparent text-white placeholder:text-white/25 text-[13px] font-light leading-6 h-[112px] border-[1px] rounded border-borderGrey py-2 px-4"
            ></textarea>
          </label>

          <label className="text-white text-xs font-semibold flex flex-col gap-2">
            Subtasks{' '}
            {subtasks.map(item => (
              <div key={item.id} className="w-full flex items-center gap-4">
                <input
                  placeholder={item.placeholder}
                  name="subtask"
                  onChange={e =>
                    updateSubtask(item.id, 'subtask', e.target.value)
                  }
                  className="bg-transparent text-white placeholder:text-white/25 text-[13px] font-light leading-6 w-full border-[1px] rounded border-borderGrey py-2 px-4"
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
            Create Task
          </button>
        </form>
      </div>
    </Modal>
  );
}
