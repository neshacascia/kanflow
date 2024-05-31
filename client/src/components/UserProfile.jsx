import Modal from './Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export default function UserProfile({ user }) {
  return (
    <Modal>
      <div className="bg-white dark:bg-darkGrey h-[90vh] relative flex flex-col rounded-md p-6 overflow-y-auto md:w-[480px] md:p-8">
        <h2 className="text-lightBlack dark:text-white text-lg font-semibold">
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
                for="avatar"
                className="text-white bg-mainPurple text-[13px] font-semibold leading-6 flex items-center gap-3 rounded py-[6px] px-4 hover:bg-mainPurpleHover hover:cursor-pointer mt-6"
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

            <div className="w-full flex flex-col gap-10">
              <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                Email
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Take coffee break"
                  value={user.email}
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
                    name="title"
                    placeholder="********"
                    required
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                  />
                </label>

                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  New password
                  <input
                    type="password"
                    name="title"
                    placeholder="********"
                    required
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                  />
                </label>

                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  Confirm password
                  <input
                    type="password"
                    name="title"
                    placeholder="********"
                    required
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple`}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button>Save Changes</button>
          <button>Delete account</button>
        </div>
      </div>
    </Modal>
  );
}
