import { useContext } from 'react';
import { Context } from '../context/Context';
import Sidebar from './Sidebar';
import BoardDetails from './BoardDetails';

export default function WelcomeMessage() {
  const { openModal, displaySidebar, modal, board } = useContext(Context);

  return (
    <section className="w-screen h-screen flex">
      {displaySidebar && <Sidebar />}
      <main className="bg-lightGrey dark:bg-veryDarkGrey w-screen h-screen flex flex-col justify-center px-4 pt-16 overflow-x-auto md:px-6 md:pt-20">
        <section className="text-lightBlack dark:text-white h-full flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-semibold">Welcome to Kanflow</h2>
          <p className="text-mediumGrey dark:text-white text-center pb-3">
            Embark on your productivity journey by creating your first board.
          </p>
          <div
            onClick={() => openModal('new')}
            className="flex items-center gap-3 py-3 px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
            <button className="text-mainPurple text-lg font-semibold">
              + Create New Board
            </button>
          </div>
        </section>
        {modal === 'new' && <BoardDetails board={board} />}
      </main>
    </section>
  );
}
