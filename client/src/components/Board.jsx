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
    setDisplaySidebar,
  } = useContext(Context);
  const { id } = useParams();

  const [tasks, setTasks] = useState();
  const [viewTask, setViewTask] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    if (id) {
      async function getBoardData() {
        try {
          const res = await axios.get(`/api/board/${id}`, {
            withCredentials: true,
          });

          const { board, tasks } = res.data;
          setBoard(board[0]);
          setTasks(tasks);
        } catch (err) {
          console.error(err);
        }
      }
      getBoardData();
    }
  }, [id]);

  return (
    <main
      onClick={() => setDisplaySettings(false)}
      className="bg-veryDarkGrey w-screen h-screen flex flex-col px-4 pt-6 overflow-x-auto"
    >
      {board && (
        <section className="h-full flex gap-3">
          {board.columns.length > 0 ? (
            board.columns.map((column, ind) => (
              <Column
                key={ind}
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
        </section>
      )}

      {modal === 'menu' && <Menu />}
      {modal === 'editBoard' && <BoardDetails board={board} />}
      {modal === 'new' && <BoardDetails board={board} />}
      {modal === 'add' && (
        <AddTask
          id={board._id}
          columns={board.columns}
          closeModal={closeModal}
        />
      )}
      {modal === 'viewTask' && (
        <ViewTask
          task={viewTask}
          columns={board.columns}
          selectedStatus={selectedStatus}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {modal === 'edit' && (
        <EditTask
          id={board._id}
          selectedTask={viewTask}
          columns={board.columns}
          closeModal={closeModal}
        />
      )}
      {modal === 'deleteTask' && (
        <Delete selectedTask={viewTask} modal={modal} closeModal={closeModal} />
      )}
      {modal === 'deleteBoard' && (
        <Delete board={board} modal={modal} closeModal={closeModal} />
      )}

      <button
        onClick={() => setDisplaySidebar(true)}
        className="hidden md:flex justify-center items-center bg-mainPurple w-14 h-12 fixed bottom-0 left-0 rounded-menuLink mb-8"
      >
        <FontAwesomeIcon
          icon={faEye}
          className="text-white text-xs py-5 pr-2"
        />
      </button>
    </main>
  );
}
