import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import MenuModal from './MenuModal';
import BoardDetailsModal from './BoardDetailsModal';
import TaskModal from './TaskModal';

export default function Board() {
  const { boards, displayMenuModal, boardDetails, displayTaskModal } =
    useContext(Context);
  const { id } = useParams();

  const board = boards?.find(board => board._id === id);

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
      {displayTaskModal && <TaskModal id={board._id} columns={board.columns} />}
    </main>
  );
}
