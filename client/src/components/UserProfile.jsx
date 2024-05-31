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
          <div className="flex gap-14">
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

            <h3>Email</h3>
          </div>
          <div className="flex flex-col">
            <h2>Security</h2>
            <h3>Password</h3>
          </div>

          <div>
            <button>Save Changes</button>
            <button>Delete account</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
