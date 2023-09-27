import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TaskModal({ id, columns, setDisplayTaskModal }) {
  const navigate = useNavigate();

  const [subtasks, setSubtasks] = useState([
    { id: 1, placeholder: 'e.g. Make coffee', subtask: '' },
    { id: 2, placeholder: 'e.g. Drink coffee & smile', subtask: '' },
  ]);

  function addNewSubtask() {
    const maxId = Math.max(...subtasks.map(subtask => subtask.id));

    setSubtasks(prevState => [...prevState, { id: maxId + 1, subtask: '' }]);
  }

  function deleteSubtask(id) {
    setSubtasks(prevState => prevState.filter(subtask => subtask.id !== id));
  }

  async function addNewTask(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('desc');
    const subtasks = Array.from(formData.getAll('subtask'));
    const status = formData.get('status');

    const taskData = {
      id,
      title,
      description,
      subtasks,
      status,
    };

    try {
      const res = await axios.post('/board/addTask', {
        taskData,
      });
      console.log(res);
      if (res.status === 200) {
        setDisplayTaskModal(false);
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={addNewTask}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="e.g. Take coffee break"
          />
        </label>

        <label>
          Description
          <textarea
            name="desc"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          ></textarea>
        </label>

        <label>
          Subtasks{' '}
          {subtasks.map(item => (
            <div>
              <input
                key={item.id}
                placeholder={item.placeholder}
                name="subtask"
              />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => deleteSubtask(item.id)}
              />
            </div>
          ))}
        </label>

        <button type="button" onClick={addNewSubtask}>
          + Add New Subtask
        </button>

        <select name="status">
          Status{' '}
          {columns.map(status => (
            <option value={status}>{status}</option>
          ))}
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
