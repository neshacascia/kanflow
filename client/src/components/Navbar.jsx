import { useContext } from 'react';
import { Context } from '../context/Context';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../public/assets/logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPlus,
  faAngleDown,
  faAngleUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const {
    board,
    modal,
    openModal,
    displaySettings,
    setDisplaySettings,
    displaySidebar,
    boards,
    isLoggedIn,
    storeAuthValue,
    displayUserProfile,
    setDisplayUserProfile,
  } = useContext(Context);

  const location = useLocation();
  const user = localStorage.getItem('user');

  return (
    <nav
      onClick={() => (displaySettings ? setDisplaySettings(false) : null)}
      className="bg-white dark:bg-darkGrey w-screen h-16 absolute px-4 md:h-20 md:border-b-[1px] border-linesLight dark:border-linesDark"
    >
      <span className="h-full flex items-center">
        <img src={logo} className="z-10" />
        <Link
          to="/"
          className={`text-black dark:text-white text-xl font-semibold tracking-wide px-4 z-10 ${
            isLoggedIn ? 'hidden' : ''
          } md:block`}
        >
          kanflow
        </Link>
        <div className="h-full border-r-[1px] border-linesLight dark:border-linesDark mr-4 hidden md:block"></div>

        <div
          className={`${
            isLoggedIn
              ? 'hidden'
              : 'text-white flex items-center gap-6 ml-auto z-10'
          }`}
        >
          {location.pathname === '/' && (
            <a href="#features" className="text-sm tracking-wider border-b">
              Features
            </a>
          )}
          <Link
            to="/login"
            onClick={() => storeAuthValue('login')}
            className={`${user ? 'hidden' : 'text-sm tracking-wider'}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => storeAuthValue('signup')}
            className={`${
              user
                ? 'hidden'
                : 'bg-mainPurple text-sm  tracking-wider py-2 px-4 rounded hover:bg-mainPurpleHover'
            }`}
          >
            Signup
          </Link>{' '}
        </div>

        {isLoggedIn && (
          <div className="w-full flex items-center gap-2">
            <div
              onClick={() => openModal('menu')}
              className="flex items-center gap-2 ml-4 mr-auto cursor-pointer md:hidden"
            >
              <h2 className="text-black dark:text-white text-lg font-semibold">
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
              className={`text-black dark:text-white text-lg font-semibold mr-auto hidden md:block md:text-[20px] ${
                displaySidebar ? 'ml-[115px]' : ''
              }`}
            >
              {board?.name}
            </h2>

            <button
              onClick={() => openModal('add')}
              disabled={board?.columns.length === 0 || boards.length === 0}
              className="text-white bg-mainPurple w-12 h-8 flex items-center justify-center rounded-3xl mr-4 hover:enabled:bg-mainPurpleHover disabled:opacity-25 md:w-[164px] md:h-12 md:gap-2"
            >
              <FontAwesomeIcon icon={faPlus} className="md:text-sm" />
              <p className="hidden md:block text-sm font-semibold">
                Add New Task
              </p>
            </button>
            <button
              onClick={() =>
                displaySettings
                  ? setDisplaySettings(false)
                  : setDisplaySettings(true)
              }
              disabled={boards.length === 0}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-mediumGrey text-lg cursor-pointer"
              />
            </button>

            <div className="h-full border-mediumGrey border-l-[1px]">.</div>

            <button
              onClick={() =>
                displayUserProfile
                  ? setDisplayUserProfile(false)
                  : setDisplayUserProfile(true)
              }
            >
              <div className="bg-mainPurple w-11 h-11 flex justify-center items-center rounded-full ml-4">
                <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
              </div>
            </button>
          </div>
        )}
      </span>

      {displaySettings && (
        <div className="bg-white dark:bg-veryDarkGrey text-xs font-light leading-6 w-[170px] flex flex-col items-start gap-4 absolute right-4 rounded-lg shadow-glow p-4 -mt-2">
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
