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
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-darkGrey w-[343px] relative flex flex-col rounded-md p-6">
      <h2 className="text-deleteRed text-lg font-semibold mb-6">
        Delete this {`${displayTaskModal === 'deleteTask' ? 'task' : 'board'}`}?
      </h2>
      <p className="text-mediumGrey text-[13px] leading-6 mb-6">
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

      <div className="flex flex-col gap-4">
        <button
          onClick={() => deleteData()}
          className="text-white bg-deleteRed text-[13px] font-semibold leading-6 rounded-[20px] py-3"
        >
          Delete
        </button>
        <button
          onClick={() => setDisplayTaskModal(false)}
          className="text-mainPurple bg-white text-[13px] font-semibold leading-6 rounded-[20px] py-3"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
