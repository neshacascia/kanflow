import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import Modal from './Modal';
import { baseURL } from '../api';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export default function UserProfile({ user }) {
  const { closeModal } = useContext(Context);

  const [newPassword, setNewPassword] = useState('');

  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  async function updateUserData(e) {
    console.log('hello');
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('newPassword');
    console.log(email, password);
  }

  return (
    <Modal>
      <form
        onSubmit={updateUserData}
        className="bg-white dark:bg-darkGrey h-[82vh] relative flex flex-col rounded-md p-6 overflow-y-auto md:w-[560px] md:p-8"
      >
        <h2 className="text-lightBlack dark:text-white text-xl font-semibold">
          Account
        </h2>
        <p className="text-mediumGrey dark:text-white text-sm font-semibold pt-2 pb-10">
          Manage your account information
        </p>

        <div className="flex">
          <div className="w-full flex gap-14">
            <div className="flex flex-col items-center">
              <div className="bg-[#706dc2da] w-16 h-16 flex justify-center items-center rounded-full">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-2xl"
                />
              </div>

              <label
                htmlFor="avatar"
                className="text-white bg-mainPurple text-xs font-semibold leading-6 flex items-center gap-3 rounded py-[6px] px-4 hover:bg-mainPurpleHover hover:cursor-pointer mt-6"
              >
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  className="hidden"
                />
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                Upload
              </label>
            </div>

            <div
              onSubmit={updateUserData}
              className="w-full flex flex-col gap-10"
            >
              <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="e.g. Take coffee break"
                  defaultValue={user.email}
                  required
                  className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                />
              </label>

              <div className="flex flex-col gap-6">
                <h2 className="text-lightBlack dark:text-white text-lg font-semibold -mb-2">
                  Change password
                </h2>
                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  Current password
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="********"
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                  />
                </label>

                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  New password
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="********"
                    onChange={handleNewPasswordChange}
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                  />
                </label>

                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  Confirm password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    required={newPassword}
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-between gap-8 md:flex-row mt-10">
          <button
            type="submit"
            className="text-mainPurple bg-lightPurple dark:bg-white text-[13px] font-semibold leading-6 md:w-[200px] rounded py-3 hover:bg-lightPurple/25"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="text-white bg-deleteRed text-[13px] font-semibold leading-6 md:w-[200px] rounded py-3 hover:bg-redHover"
          >
            Delete Account
          </button>
        </div>
      </form>
    </Modal>
  );
}
