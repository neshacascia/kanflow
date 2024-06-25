import { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Context';
import Modal from './Modal';
import DefaultAvatar from './DefaultAvatar';
import { baseURL } from '../api';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function UserProfile({ user, setIsBoardUpdated }) {
  const { closeModal, openModal } = useContext(Context);

  const [avatarURL, setAvatarURL] = useState(user.avatar);

  const [currentPassword, setCurrentPassword] = useState('');
  const [enteredCurrentPasswordTouched, setEnteredCurrentPasswordTouched] =
    useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [enteredNewPasswordTouched, setEnteredNewPasswordTouched] =
    useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [enteredConfirmPasswordTouched, setEnteredConfirmPasswordTouched] =
    useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState();

  const enteredCurrentPasswordValidation =
    currentPassword.trim() !== '' && currentPassword.length >= 8;
  const enteredCurrentPasswordNotValid =
    !enteredCurrentPasswordValidation && enteredCurrentPasswordTouched;

  const enteredNewPasswordValidation =
    newPassword.trim() !== '' && newPassword.length >= 8;
  const enteredNewPasswordNotValid =
    !enteredNewPasswordValidation && enteredNewPasswordTouched;

  const enteredConfirmPasswordValidation =
    confirmPassword.trim() !== '' && confirmPassword.length >= 8;
  const enteredConfirmPasswordNotValid =
    !enteredConfirmPasswordValidation && enteredConfirmPasswordTouched;

  useEffect(() => {
    const arePasswordsEqual = newPassword === confirmPassword;
    setPasswordsMatch(arePasswordsEqual);
  }, [newPassword, confirmPassword]);

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });

  function handleCurrentPasswordChange(e) {
    setCurrentPassword(e.target.value);
  }

  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function currentPasswordInputBlurHandler() {
    setEnteredCurrentPasswordTouched(true);
  }

  function newPasswordInputBlurHandler() {
    setEnteredNewPasswordTouched(true);
  }

  function confirmPasswordInputBlurHandler() {
    setEnteredConfirmPasswordTouched(true);
  }

  async function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (file) {
      const avatarFormData = new FormData();
      avatarFormData.append('avatar', file);

      try {
        const res = await axios.post(
          `${baseURL}/account/updateAvatar`,
          avatarFormData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log(res);

        if (res.status === 200) {
          setAvatarURL(res.data.avatarLink);
          setIsBoardUpdated(true);
        } else {
          throw new Error('Failed to update avatar');
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function updateUserData(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const newPassword = passwordsMatch ? formData.get('newPassword') : null;

    try {
      const res = await axios.put(
        `${baseURL}/account/updateAccount`,
        { email, newPassword, currentPassword },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        setIsBoardUpdated(true);
        closeModal();
      }
    } catch (err) {
      console.error(err);

      if (err.response.status === 401) {
        setErrorMessages(prevState => ({
          ...prevState,
          password: err.response.data.msg,
        }));
      }

      if (err.response.status === 403 || err.response.status === 409) {
        setErrorMessages(prevState => ({
          ...prevState,
          email: err.response.data.msg,
        }));
      }
    }
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
              {avatarURL ? (
                <img src={avatarURL} className="w-16 h-16 rounded-full" />
              ) : (
                <DefaultAvatar size="16" avatar="text-xl" />
              )}

              <label
                htmlFor="avatar"
                className="text-white bg-mainPurple text-xs font-semibold leading-6 flex items-center gap-3 rounded py-[6px] px-4 hover:bg-mainPurpleHover hover:cursor-pointer mt-6"
              >
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={handleAvatarChange}
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
                {errorMessages['email'] && (
                  <span className="text-deleteRed text-xs flex pb-1">
                    {errorMessages['email']}
                  </span>
                )}
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
                    onChange={handleCurrentPasswordChange}
                    onBlur={currentPasswordInputBlurHandler}
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                      errorMessages['password'] ||
                      enteredCurrentPasswordNotValid
                        ? 'border-deleteRed'
                        : ''
                    }`}
                  />
                  {errorMessages['password'] && (
                    <span className="text-deleteRed text-xs flex pb-1">
                      {errorMessages['password']}
                    </span>
                  )}
                  {enteredCurrentPasswordNotValid && (
                    <span className="text-deleteRed text-xs flex pb-1">
                      Password must have a minimum of 8 characters.
                    </span>
                  )}
                </label>

                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  New password
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="********"
                    onChange={handleNewPasswordChange}
                    onBlur={newPasswordInputBlurHandler}
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                      enteredNewPasswordNotValid || !passwordsMatch
                        ? 'border-deleteRed'
                        : ''
                    }`}
                  />
                  {enteredNewPasswordNotValid && (
                    <span className="text-deleteRed text-xs flex pb-1">
                      Password must have a minimum of 8 characters.
                    </span>
                  )}
                </label>

                <label className="text-mediumGrey dark:text-white text-xs font-semibold flex flex-col gap-2">
                  Confirm password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    required={newPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={confirmPasswordInputBlurHandler}
                    className={`bg-transparent text-lightBlack dark:text-white text-[13px] font-light leading-6 border-[1px] rounded border-borderGrey py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                      enteredConfirmPasswordNotValid || !passwordsMatch
                        ? 'border-deleteRed'
                        : ''
                    }`}
                  />
                  {enteredConfirmPasswordNotValid && (
                    <span className="text-deleteRed text-xs flex pb-1">
                      Password must have a minimum of 8 characters.
                    </span>
                  )}
                  {!passwordsMatch && (
                    <span className="text-deleteRed text-xs flex pb-1">
                      Passwords do not match. Please try again.
                    </span>
                  )}
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
            onClick={() => openModal('deleteAccount')}
            className="text-white bg-deleteRed text-[13px] font-semibold leading-6 md:w-[200px] rounded py-3 hover:bg-redHover"
          >
            Delete Account
          </button>
        </div>
      </form>
    </Modal>
  );
}
