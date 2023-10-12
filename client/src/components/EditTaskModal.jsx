import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditTaskModal({
  id,
  selectedTask,
  columns,
  setDisplayTaskModal,
}) {
  const navigate = useNavigate();

  const [task, setTask] = useState(selectedTask);
  const [subtasks, setSubtasks] = useState(task.subtasks);

  function handleInputChange(key, value) {
    setTask({ ...task, [key]: value });
  }

  function addNewSubtask() {
    const maxId = Math.max(...subtasks.map(subtask => subtask.id));

    setSubtasks(prevState => [
      ...prevState,
      { id: maxId + 1, subtask: '', completed: false },
    ]);
  }

  function updateSubtask(id, key, value) {
    setSubtasks(
      task.subtasks.map(subtask => {
        console.log(subtask.id, id);
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
      const res = await axios.put('/board/editTask', {
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
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => setDisplayTaskModal(false)}
      />
      <h2>Edit Task</h2>
      <form onSubmit={editTask}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="e.g. Take coffee break"
            value={task.title}
            onChange={e => handleInputChange('title', e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            name="desc"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            value={task.description}
            onChange={e => handleInputChange('description', e.target.value)}
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
                value={item?.subtask}
                onChange={e =>
                  updateSubtask(item.id, 'subtask', e.target.value)
                }
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}
