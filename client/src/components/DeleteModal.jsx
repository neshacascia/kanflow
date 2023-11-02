import axios from 'axios';

export default function DeleteModal({
  selectedTask,
  displayTaskModal,
  setDisplayTaskModal,
}) {
  async function deleteTask() {
    const taskId = selectedTask._id;

    try {
      const res = await axios.delete('/board/delete', { data: { taskId } });
      console.log(res);
      setDisplayTaskModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Delete this task?</h2>
      <p>
        Are you sure you want to delete the {`'${selectedTask.title}'`} task and
        its subtasks? This action cannot be reversed.
      </p>
      <button onClick={() => deleteTask()}>Delete</button>
      <button onClick={() => setDisplayTaskModal(false)}>Cancel</button>
    </div>
  );
}
