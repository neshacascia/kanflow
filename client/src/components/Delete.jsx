import { useContext } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

export default function Delete({
  board,
  selectedTask,
  setIsBoardUpdated,
  modal,
  closeModal,
}) {
  const { boards } = useContext(Context);
  const navigate = useNavigate();

  async function deleteData() {
    const data = modal === 'deleteTask' ? selectedTask._id : board._id;

    try {
      const res = await axios.delete('/api/board/delete', {
        data: { modal, data },
      });
      console.log(res);

      if (modal === 'deleteTask') {
        setIsBoardUpdated(true);
      } else {
        const previousBoard =
          boards?.findIndex(elem => elem._id === board._id) - 1;

        const deletedFirstBoard = boards[0]._id === board._id;

        if (boards.length !== 1 && !deletedFirstBoard) {
          navigate(`/board/${boards[previousBoard]._id}`);
        } else if (boards.length !== 1 && deletedFirstBoard) {
          navigate(`/board/${boards[1]._id}`);
        } else {
          navigate('/board');
          window.location.reload();
        }
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal>
      <div className="bg-white dark:bg-darkGrey w-[343px] relative flex flex-col rounded-md p-6 md:w-[480px] md:p-8">
        <h2 className="text-deleteRed text-lg font-semibold mb-6">
          Delete this {`${modal === 'deleteTask' ? 'task' : 'board'}`}?
        </h2>
        <p className="text-mediumGrey text-[13px] leading-6 mb-6">
          Are you sure you want to delete the
          {`${
            modal === 'deleteTask'
              ? ` '${selectedTask.title}' task and its subtasks`
              : ` '${board.name}' board`
          }`}
          ?{' '}
          {`This action ${
            modal === 'deleteBoard'
              ? 'will remove all columns and tasks and '
              : ' '
          }cannot be reversed.`}
        </p>

        <div className="flex flex-col gap-4 md:flex-row">
          <button
            onClick={() => deleteData()}
            className="text-white bg-deleteRed text-[13px] font-semibold leading-6 md:w-[200px] rounded-[20px] py-3 hover:bg-redHover"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="text-mainPurple bg-lightPurple dark:bg-white text-[13px] font-semibold leading-6 md:w-[200px] rounded-[20px] py-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
