import { useContext, useState, useEffect } from 'react';
import { BoardContext, MODAL_TYPES } from '../../context/BoardContext';
import Modal from '@components/ui/Modal';
import DefaultAvatar from '@components/profile/DefaultAvatar';
import { baseURL } from '../../api';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function UserProfile({
  user,
  setIsBoardUpdated,
  setBoardPageUpdated,
}) {
  const { closeModal, openModal } = useContext(BoardContext);

  const [formInputs, setFormInputs] = useState({
    avatarImg: user.avatar,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [formTouched, setFormTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState();

  const enteredCurrentPasswordValidation =
    formInputs.currentPassword.trim() !== '' &&
    formInputs.currentPassword.length >= 8;
  const enteredCurrentPasswordNotValid =
    !enteredCurrentPasswordValidation && formTouched.currentPassword;

  const enteredNewPasswordValidation =
    formInputs.newPassword.trim() !== '' && formInputs.newPassword.length >= 8;
  const enteredNewPasswordNotValid =
    !enteredNewPasswordValidation && formTouched.newPassword;

  const enteredConfirmPasswordValidation =
    formInputs.confirmNewPassword.trim() !== '' &&
    formInputs.confirmNewPassword.length >= 8;
  const enteredConfirmPasswordNotValid =
    !enteredConfirmPasswordValidation && formTouched.confirmNewPassword;

  useEffect(() => {
    const arePasswordsEqual =
      formInputs.newPassword === formInputs.confirmNewPassword;
    setPasswordsMatch(arePasswordsEqual);
  }, [formInputs.newPassword, formInputs.confirmNewPassword]);

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormInputs(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleInputTouched(e) {
    const { name } = e.target;

    setFormTouched(prevState => {
      return {
        ...prevState,
        [name]: true,
      };
    });
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
          setAvatarImg(res.data.avatarLink);
          setIsBoardUpdated
            ? setIsBoardUpdated(true)
            : setBoardPageUpdated(true);
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

    const email = formInputs.email;
    const newPassword = passwordsMatch ? formInputs.newPassword : null;

    try {
      const res = await axios.put(
        `${baseURL}/account/updateAccount`,
        { email, newPassword, currentPassword: formInputs.currentPassword },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        setIsBoardUpdated ? setIsBoardUpdated(true) : setBoardPageUpdated(true);
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
              {formInputs.avatarImg ? (
                <img
                  src={formInputs.avatarImg}
                  className="w-16 h-16 rounded-full"
                />
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    onBlur={handleInputTouched}
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
                    onChange={handleInputChange}
                    onBlur={handleInputTouched}
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
                    name="confirmNewPassword"
                    placeholder="********"
                    required={formInputs.newPassword}
                    onChange={handleInputChange}
                    onBlur={handleInputTouched}
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
            onClick={() => openModal(MODAL_TYPES.deleteAccount)}
            className="text-white bg-deleteRed text-[13px] font-semibold leading-6 md:w-[200px] rounded py-3 hover:bg-redHover"
          >
            Delete Account
          </button>
        </div>
      </form>
    </Modal>
  );
}
