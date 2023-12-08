import axios from 'axios';

export default function Delete({
  board,
  selectedTask,
  displayTaskModal,
  setDisplayTaskModal,
}) {
  async function deleteData() {
    const data =
      displayTaskModal === 'deleteTask' ? selectedTask._id : board._id;

    try {
      const res = await axios.delete('/api/board/delete', {
        data: { displayTaskModal, data },
      });
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
      <button onClick={() => deleteData()}>Delete</button>
      <button onClick={() => setDisplayTaskModal(false)}>Cancel</button>
    </div>
  );
}
