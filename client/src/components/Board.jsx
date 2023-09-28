import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import MenuModal from './MenuModal';
import BoardDetailsModal from './BoardDetailsModal';
import TaskModal from './TaskModal';

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
            {board.columns.map(column => (
              <span>{column}()</span>
            ))}
          </section>
        </>
      )}

      {displayMenuModal && <MenuModal />}
      {boardDetails && <BoardDetailsModal />}
      {displayTaskModal && (
        <TaskModal
          id={board._id}
          columns={board.columns}
          setDisplayTaskModal={setDisplayTaskModal}
        />
      )}
    </main>
  );
}
