import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BoardContext, MODAL_TYPES } from '../../context/BoardContext';
import { UIContext } from '../../context/UIContext';
import Column from '@components/board/Column';
import Menu from '@components/layout/Menu';
import BoardDetails from '@components/board/BoardDetails';
import AddTask from '@components/tasks/AddTask';
import ViewTask from '@components/tasks/ViewTask';
import EditTask from '@components/tasks/EditTask';
import Delete from '@components/board/Delete';
import UserProfile from '@components/profile/UserProfile';
import Sidebar from '@components/layout/Sidebar';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { baseURL } from '../../api';
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Board() {
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const {
    board,
    setBoard,
    setBoards,
    boardIndex,
    setBoardIndex,
    modal,
    openModal,
    closeModal,
  } = useContext(BoardContext);
  const {
    setDisplaySettings,
    displaySidebar,
    setDisplaySidebar,
    setDisplayUserProfile,
  } = useContext(UIContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState();
  const [viewTask, setViewTask] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [isBoardUpdated, setIsBoardUpdated] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const modalComponents = {
    menu: Menu,
    editBoard: BoardDetails,
    newBoard: BoardDetails,
    addTask: AddTask,
    viewTask: ViewTask,
    editTask: EditTask,
    deleteTask: Delete,
    deleteBoard: Delete,
    userProfile: UserProfile,
    deleteAccount: Delete,
  };

  const modalProps = {
    editBoard: { board, setIsBoardUpdated },
    newBoard: { board },
    addTask: {
      boardIndex,
      columns: board?.columns,
      closeModal,
      setIsBoardUpdated,
    },
    viewTask: {
      boardIndex,
      task: viewTask,
      tasks,
      columns: board?.columns,
      selectedStatus,
      setIsBoardUpdated,
      openModal,
      closeModal,
    },
    editTask: {
      boardIndex,
      tasks,
      selectedTask: viewTask,
      columns: board?.columns,
      selectedStatus,
      setIsBoardUpdated,
      closeModal,
    },
    deleteTask: {
      boardIndex,
      tasks,
      selectedTask: viewTask,
      setIsBoardUpdated,
      modal,
      closeModal,
    },
    deleteBoard: { boardIndex, board, modal, closeModal },
    userProfile: { user, setIsBoardUpdated },
    deleteAccount: { user, modal, closeModal },
  };

  const ModalComponent = modalComponents[modal];
  const props = modalProps[modal] || {};

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const [boardRes, boardsRes] = await Promise.all([
            axios.get(`${baseURL}/board/${id}`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
            axios.get(`${baseURL}/board/getBoards`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
          ]);

          const { board } = boardRes.data;
          const { boards, user } = boardsRes.data;
          setUser(user);

          setBoard(board);
          setTasks(board.tasks);
          setBoards(boards);
          setBoardIndex(boards.findIndex(board => board._id === id));
          setIsBoardUpdated(false);
          setIsLoggedIn(true);
        } catch (err) {
          navigate('/error');
          console.error(err);
        } finally {
          setLoadingData(false);
        }
      }
      fetchData();
    }
  }, [id, isBoardUpdated]);

  function findContainer(id) {
    const task = tasks.find(task => task._id === id);

    if (task) {
      const column = board.columns.find(
        column => column.columnName === task.status
      );

      if (column) {
        return column.id;
      }
    }
  }

  function handleDragStart(e) {
    const { active } = e;

    setActiveTask(tasks.find(task => task._id === active.id));
  }

  async function handleDragEnd(e) {
    const { over, active } = e;

    if (over) {
      // reorder tasks within the same column
      const updatedTasks = [...tasks];
      const oldIndex = tasks.findIndex(task => task._id === active.id);
      const newIndex = tasks.findIndex(task => task._id === over.id);

      // if newIndex is -1, it means it's moving to a different column
      if (newIndex === -1) {
        updatedTasks[oldIndex].status = over.id;
      } else {
        const overContainer = findContainer(over.id);
        updatedTasks[oldIndex].status = board.columns[overContainer].columnName;
      }

      // move the task to the new index
      updatedTasks.splice(oldIndex, 1);
      updatedTasks.splice(newIndex, 0, tasks[oldIndex]);

      setTasks(updatedTasks);
      setActiveTask(null);

      const tasksData = {
        boardIndex,
        updatedTasks,
      };

      try {
        const res = await axios.put(`${baseURL}/board/reorderTasks`, {
          tasksData,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <section className="w-screen h-screen flex">
      {displaySidebar && <Sidebar />}
      <main
        onClick={() => {
          setDisplaySettings(false);
          setDisplayUserProfile(false);
        }}
        className="bg-lightGrey dark:bg-veryDarkGrey w-screen h-screen flex flex-col justify-center px-4 pt-16 overflow-x-auto md:px-6 md:pt-20"
      >
        {loadingData ? (
          <LoadingSpinner />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
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
                    activeTask={activeTask}
                  />
                ))
              ) : (
                <div className="w-full flex flex-col justify-center items-center gap-6 pb-16">
                  <p className="text-mediumGrey text-lg font-semibold text-center">
                    This board is empty. Create a new column to get started.
                  </p>
                  <button className="bg-mainPurple text-white text-sm font-semibold w-[174px] flex justify-center items-center gap-1 rounded-3xl py-4 hover:bg-mainPurpleHover">
                    <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                    <p onClick={() => openModal(MODAL_TYPES.editBoard)}>
                      Add New Column
                    </p>
                  </button>
                </div>
              )}
              {board.columns.length > 0 && (
                <div
                  onClick={() => openModal(MODAL_TYPES.editBoard)}
                  className="hidden text-mediumGrey bg-lightColumn dark:bg-column text-lg font-semibold min-w-[280px] h-[814px] lg:flex justify-center items-center gap-1 rounded-md mt-10 cursor-pointer hover:text-mainPurple"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-xs" />
                  New Column
                </div>
              )}
            </section>
          </DndContext>
        )}
        {ModalComponent && <ModalComponent {...props} />}
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
