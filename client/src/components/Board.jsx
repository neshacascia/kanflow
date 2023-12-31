import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import Column from './Column';
import Menu from './Menu';
import BoardDetails from './BoardDetails';
import AddTask from './AddTask';
import ViewTask from './ViewTask';
import EditTask from './EditTask';
import Delete from './Delete';
import Sidebar from './Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Board() {
  const {
    board,
    setBoard,
    modal,
    openModal,
    closeModal,
    setDisplaySettings,
    displaySidebar,
    setDisplaySidebar,
    setBoards,
    boards,
    setIsLoggedIn,
  } = useContext(Context);
  const { id } = useParams();

  const [tasks, setTasks] = useState();
  const [viewTask, setViewTask] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [isBoardUpdated, setIsBoardUpdated] = useState(false);

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const [boardRes, boardsRes] = await Promise.all([
            axios.get(`/api/board/${id}`, {
              withCredentials: true,
            }),
            axios.get('/api/board/getBoards', {
              withCredentials: true,
            }),
          ]);

          const { board, tasks } = boardRes.data;
          const { boards } = boardsRes.data;
          setBoard(board[0]);
          setTasks(tasks);
          setBoards(boards);
          setIsBoardUpdated(false);
          setIsLoggedIn(true);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }
  }, [id, isBoardUpdated]);

  return (
    <section className="w-screen h-screen flex">
      {displaySidebar && <Sidebar />}
      <main
        onClick={() => setDisplaySettings(false)}
        className="bg-veryDarkGrey w-screen h-screen flex flex-col px-4 pt-16 overflow-x-auto md:px-6 md:pt-20"
      >
        {boards.length === 0 && (
          <section className="text-white h-full flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-semibold">Welcome to Kanflow</h2>
            <p className="text-center pb-3">
              Embark on your productivity journey by creating your first board.
            </p>
            <div
              onClick={() => openModal('new')}
              className="flex items-center gap-3 py-3 px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                  fill="#635FC7"
                />
              </svg>
              <button className="text-mainPurple text-lg font-semibold">
                + Create New Board
              </button>
            </div>
          </section>
        )}
        {board && (
          <section className="h-full flex gap-3 pt-6">
            {board.columns.length > 0 ? (
              board.columns.map((column, ind) => (
                <Column
                  key={ind}
                  ind={ind}
                  name={column.columnName}
                  tasks={tasks}
                  setViewTask={setViewTask}
                  setSelectedStatus={setSelectedStatus}
                  openModal={openModal}
                />
              ))
            ) : (
              <div className="w-full flex flex-col justify-center items-center gap-6 pb-16">
                <p className="text-mediumGrey text-lg font-semibold text-center">
                  This board is empty. Create a new column to get started.
                </p>
                <button className="bg-mainPurple text-white text-sm font-semibold w-[174px] flex justify-center items-center gap-1 rounded-3xl py-4 hover:bg-mainPurpleHover">
                  <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                  <p onClick={() => openModal('editBoard')}>Add New Column</p>
                </button>
              </div>
            )}
            {board.columns.length > 0 && (
              <div
                onClick={() => openModal('editBoard')}
                className="hidden text-mediumGrey bg-column text-lg font-semibold min-w-[280px] h-[814px] lg:flex justify-center items-center gap-1 rounded-md mt-10 cursor-pointer hover:text-mainPurple"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                New Column
              </div>
            )}
          </section>
        )}

        {modal === 'menu' && <Menu />}
        {modal === 'editBoard' && (
          <BoardDetails board={board} setIsBoardUpdated={setIsBoardUpdated} />
        )}
        {modal === 'new' && <BoardDetails board={board} />}
        {modal === 'add' && (
          <AddTask
            id={board._id}
            columns={board.columns}
            closeModal={closeModal}
            setIsBoardUpdated={setIsBoardUpdated}
          />
        )}
        {modal === 'viewTask' && (
          <ViewTask
            task={viewTask}
            columns={board.columns}
            selectedStatus={selectedStatus}
            setIsBoardUpdated={setIsBoardUpdated}
            openModal={openModal}
            closeModal={closeModal}
          />
        )}
        {modal === 'edit' && (
          <EditTask
            id={board._id}
            selectedTask={viewTask}
            columns={board.columns}
            setIsBoardUpdated={setIsBoardUpdated}
            closeModal={closeModal}
          />
        )}
        {modal === 'deleteTask' && (
          <Delete
            selectedTask={viewTask}
            setIsBoardUpdated={setIsBoardUpdated}
            modal={modal}
            closeModal={closeModal}
          />
        )}
        {modal === 'deleteBoard' && (
          <Delete board={board} modal={modal} closeModal={closeModal} />
        )}

        <button
          onClick={() => setDisplaySidebar(true)}
          className="hidden md:flex justify-center items-center bg-mainPurple w-14 h-12 fixed bottom-0 left-0 rounded-menuLink mb-8 hover:bg-mainPurpleHover"
        >
          <FontAwesomeIcon
            icon={faEye}
            className="text-white text-xs py-5 pr-2"
          />
        </button>
      </main>
    </section>
  );
}
