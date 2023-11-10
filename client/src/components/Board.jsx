import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import Column from './Column';
import MenuModal from './MenuModal';
import BoardDetailsModal from './BoardDetailsModal';
import AddTaskModal from './AddTaskModal';
import ViewTaskModal from './ViewTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteModal from './DeleteModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Board() {
  const {
    displayMenuModal,
    boardDetails,
    displayTaskModal,
    setDisplayTaskModal,
  } = useContext(Context);
  const { id } = useParams();

  const [board, setBoard] = useState();
  const [tasks, setTasks] = useState();
  const [viewTask, setViewTask] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    if (id) {
      async function getBoardData() {
        try {
          const res = await axios.get(`/board/${id}`, {
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
    <main>
      {board && (
        <>
          <h1>{board.name}</h1>

          <section>
            {board.columns.length > 0 ? (
              board.columns.map(column => (
                <Column
                  name={column}
                  tasks={tasks}
                  setViewTask={setViewTask}
                  setSelectedStatus={setSelectedStatus}
                />
              ))
            ) : (
              <div>
                <p>This board is empty. Create a new column to get started.</p>
                <button>
                  <FontAwesomeIcon icon={faPlus} /> Add New Column
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {displayMenuModal && <MenuModal />}
      {boardDetails && <BoardDetailsModal board={board} />}
      {displayTaskModal === 'add' && (
        <AddTaskModal
          id={board._id}
          columns={board.columns}
          setDisplayTaskModal={setDisplayTaskModal}
        />
      )}
      {displayTaskModal === 'edit' && (
        <EditTaskModal
          id={board._id}
          selectedTask={viewTask}
          columns={board.columns}
          setDisplayTaskModal={setDisplayTaskModal}
        />
      )}
      {displayTaskModal === 'deleteTask' && (
        <DeleteModal
          selectedTask={viewTask}
          displayTaskModal={displayTaskModal}
          setDisplayTaskModal={setDisplayTaskModal}
        />
      )}
      {displayTaskModal === 'deleteBoard' && (
        <DeleteModal
          board={board}
          displayTaskModal={displayTaskModal}
          setDisplayTaskModal={setDisplayTaskModal}
        />
      )}
      {viewTask && (
        <ViewTaskModal
          task={viewTask}
          columns={board.columns}
          selectedStatus={selectedStatus}
        />
      )}
    </main>
  );
}
