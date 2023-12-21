import { useContext, useState } from 'react';
import { Context } from '../context/Context';

import logo from '../assets/logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPlus,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const {
    board,
    modal,
    openModal,
    displaySettings,
    setDisplaySettings,
    displaySidebar,
  } = useContext(Context);

  const user = localStorage.getItem('user');

  return (
    <nav
      onClick={() => (displaySettings ? setDisplaySettings(false) : null)}
      className="bg-darkGrey w-screen h-16 absolute px-4"
    >
      <span className="h-full flex items-center">
        <img src={logo} />
        <p className="text-white text-xl font-semibold tracking-wide px-4 hidden md:block">
          kanflow
        </p>
        <div className="h-full border-r-[1px] border-linesDark mr-4 hidden md:block"></div>

        {user && (
          <div className="w-full flex items-center gap-2">
            <div
              onClick={() => openModal('menu')}
              className="flex items-center gap-2 ml-4 mr-auto cursor-pointer md:hidden"
            >
              <h2 className="text-white text-lg font-semibold">
                {board?.name}
              </h2>
              {modal === 'menu' ? (
                <FontAwesomeIcon icon={faAngleUp} className="text-mainPurple" />
              ) : (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="text-mainPurple"
                />
              )}
            </div>

            <h2
              className={`text-white text-lg font-semibold mr-auto hidden md:block ${
                displaySidebar ? 'ml-[90px]' : ''
              }`}
            >
              {board?.name}
            </h2>

            <button
              onClick={() => openModal('add')}
              disabled={board?.columns.length === 0}
              className="bg-mainPurple w-12 h-8 flex items-center justify-center rounded-3xl mr-4 disabled:opacity-25"
            >
              <FontAwesomeIcon icon={faPlus} className="text-white" />
            </button>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              onClick={() =>
                displaySettings
                  ? setDisplaySettings(false)
                  : setDisplaySettings(true)
              }
              className="text-mediumGrey text-lg cursor-pointer"
            />
          </div>
        )}
      </span>

      {displaySettings && (
        <div className="bg-veryDarkGrey text-xs font-light leading-6 w-[170px] flex flex-col items-start gap-4 absolute right-4 rounded-lg shadow-glow p-4 -mt-2">
          <button
            onClick={() => openModal('editBoard')}
            className="text-mediumGrey"
          >
            Edit Board
          </button>
          <button
            onClick={() => openModal('deleteBoard')}
            className="text-deleteRed"
          >
            Delete Board
          </button>
        </div>
      )}
    </nav>
  );
}
