import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BoardContext, MODAL_TYPES } from '../../context/BoardContext';
import Modal from '@components/ui/Modal';
import ToggleThemeButton from '@components/ui/ToggleThemeButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
  const { boards, openModal, closeModal } = useContext(BoardContext);
  const location = useLocation();

  return (
    <Modal>
      <div className="bg-white dark:bg-darkGrey w-[264px] relative rounded-lg shadow-glow py-4 md:hidden">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeModal}
          className="text-mediumGrey w-4 h-4 absolute right-0 mr-4 cursor-pointer"
        />
        <h3 className="text-mediumGrey text-xs font-semibold tracking-[2.4px] uppercase px-6 mb-4">
          All Boards ({boards.length})
        </h3>

        <div className="flex flex-col pr-6">
          {boards?.map((board, ind) => (
            <NavLink
              key={ind}
              to={`/board/${board._id}`}
              onClick={closeModal}
              className={({ isActive }) =>
                `text-[15px] font-semibold flex items-center gap-3 rounded-menuLink py-3 pl-6 ${
                  isActive
                    ? 'text-white bg-mainPurple'
                    : 'text-mediumGrey hover:bg-lightPurple dark:hover:bg-white hover:text-mainPurple'
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                  fill={
                    location.pathname === `/board/${board._id}`
                      ? '#fff'
                      : '#828FA3'
                  }
                />
              </svg>
              {board.name}
            </NavLink>
          ))}
        </div>

        <div
          onClick={() => openModal(MODAL_TYPES.newBoard)}
          className="flex items-center gap-3 py-3 px-6 mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
              fill="#635FC7"
            />
          </svg>
          <button className="text-mainPurple text-[15px] font-semibold">
            + Create New Board
          </button>
        </div>

        <ToggleThemeButton />
      </div>
    </Modal>
  );
}
