import { useContext } from 'react';
import { BoardContext } from '../../context/BoardContext';

export default function Modal({ children }) {
  const { closeModal } = useContext(BoardContext);

  function handleModalClick(e) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={closeModal}
      className="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-50"
    >
      <div onClick={handleModalClick}>{children}</div>
    </div>
  );
}
