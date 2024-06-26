import { createContext, useState } from 'react';

const BoardContext = createContext();

function BoardContextProvider(props) {
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState();
  const [boardIndex, setBoardIndex] = useState();
  const [modal, setModal] = useState(null);

  function openModal(modal) {
    setModal(null);

    if (modal === 'menu') {
      setModal('menu');
    } else if (modal === 'editBoard') {
      setModal('editBoard');
    } else if (modal === 'new') {
      setModal('new');
    } else if (modal === 'add') {
      setModal('add');
    } else if (modal === 'edit') {
      setModal('edit');
    } else if (modal === 'viewTask') {
      setModal('viewTask');
    } else if (modal === 'deleteTask') {
      setModal('deleteTask');
    } else if (modal === 'deleteBoard') {
      setModal('deleteBoard');
    } else if (modal === 'userProfile') {
      setModal('userProfile');
    } else if (modal === 'deleteAccount') {
      setModal('deleteAccount');
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

export { BoardContext, BoardContextProvider };
