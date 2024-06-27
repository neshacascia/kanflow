import { createContext, useState } from 'react';

const BoardContext = createContext();

const MODAL_TYPES = {
  menu: 'menu',
  newBoard: 'newBoard',
  editBoard: 'editBoard',
  addTask: 'addTask',
  editTask: 'editTask',
  viewTask: 'viewTask',
  deleteTask: 'deleteTask',
  deleteBoard: 'deleteBoard',
  userProfile: 'userProfile',
  deleteAccount: 'deleteAccount',
};

function BoardContextProvider(props) {
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();
  const [boardIndex, setBoardIndex] = useState();
  const [modal, setModal] = useState(null);

  function openModal(modalKey) {
    const modalType = MODAL_TYPES[modalKey];

    if (modalType) {
      setModal(modalType);
    }
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        board,
        setBoard,
        boardIndex,
        setBoardIndex,
        modal,
        setModal,
        openModal,
        closeModal,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

export { BoardContext, BoardContextProvider, MODAL_TYPES };
