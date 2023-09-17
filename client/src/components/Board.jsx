import { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import MenuModal from './MenuModal';
import BoardDetailsModal from './BoardDetailsModal';

export default function Board() {
  const { boards, displayMenuModal, boardDetails } = useContext(Context);
  const { id } = useParams();
  const { pathname } = useLocation();

  const board = boards?.find(board => board._id === id);

  return (
    <main>
      <h1>{pathname === '/board' ? boards[0]?.name : board.name}</h1>

      {displayMenuModal && <MenuModal />}
      {boardDetails && <BoardDetailsModal />}
    </main>
  );
}
