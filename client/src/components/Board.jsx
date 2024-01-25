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
import LoadingSpinner from './LoadingSpinner';

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
    setIsLoggedIn,
  } = useContext(Context);
  const { id } = useParams();

  const [tasks, setTasks] = useState();
  const [viewTask, setViewTask] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [isBoardUpdated, setIsBoardUpdated] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const [boardRes, boardsRes] = await Promise.all([
            axios.get(`/api/board/${id}`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
            axios.get('/api/board/getBoards', {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
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
        } finally {
          setLoadingData(false);
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
        className="bg-lightGrey dark:bg-veryDarkGrey w-screen h-screen flex flex-col justify-center px-4 pt-16 overflow-x-auto md:px-6 md:pt-20"
      >
        {loadingData ? (
          <LoadingSpinner />
        ) : (
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
                className="hidden text-mediumGrey bg-lightColumn dark:bg-column text-lg font-semibold min-w-[280px] h-[814px] lg:flex justify-center items-center gap-1 rounded-md mt-10 cursor-pointer hover:text-mainPurple"
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
            selectedStatus={selectedStatus}
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
