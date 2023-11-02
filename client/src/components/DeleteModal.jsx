import axios from 'axios';

export default function DeleteModal({
  board,
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
      <h2>
        Delete this {`${displayTaskModal === 'deleteTask' ? 'task' : 'board'}`}?
      </h2>
      <p>
        Are you sure you want to delete the
        {`${
          displayTaskModal === 'deleteTask'
            ? ` '${selectedTask.title}' task and its subtasks`
            : ` '${board.name}' board`
        }`}
        ?{' '}
        {`This action ${
          displayTaskModal === 'deleteBoard'
            ? 'will remove all columns and tasks and '
            : ' '
        }cannot be reversed.`}
      </p>
      <button onClick={() => deleteTask()}>Delete</button>
      <button onClick={() => setDisplayTaskModal(false)}>Cancel</button>
    </div>
  );
}
