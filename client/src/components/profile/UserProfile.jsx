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
    email: false,
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState();

  const validationSchema = {
    email: value => value.trim() !== '' && value.includes('@'),
    currentPassword: value => value.trim() !== '' && value.length >= 8,
    newPassword: value => value.trim() !== '' && value.length >= 8,
    confirmNewPassword: (value, formInputs) => value === formInputs.newPassword,
  };

  function validateField(name, value, formInputs) {
    return validationSchema[name](value, formInputs);
  }

  function isFieldNotValid(name, value, formInputs, touched) {
    return !validateField(name, value, formInputs) && touched[name];
  }

  const emailNotValid = isFieldNotValid(
    'email',
    formInputs.email,
    formInputs,
    formTouched
  );

  const currentPasswordNotValid = isFieldNotValid(
    'currentPassword',
    formInputs.currentPassword,
    formInputs,
    formTouched
  );

  const newPasswordNotValid = isFieldNotValid(
    'newPassword',
    formInputs.newPassword,
    formInputs,
    formTouched
  );

  const confirmNewPasswordLengthValid =
    formInputs.confirmNewPassword.trim() !== '' &&
    formInputs.confirmNewPassword.length >= 8;

  const confirmNewPasswordNotValid =
    !confirmNewPasswordLengthValid && formTouched.confirmNewPassword;

  const formIsValid =
    (validateField('email', formInputs.email, formInputs) &&
      formTouched.email) ||
    (validateField('email', formInputs.email, formInputs) &&
      !formTouched.email &&
      validateField(
        'currentPassword',
        formInputs.currentPassword,
        formInputs
      ) &&
      validateField('newPassword', formInputs.newPassword, formInputs) &&
      validateField(
        'confirmNewPassword',
        formInputs.confirmNewPassword,
        formInputs
      ));

  useEffect(() => {
    setPasswordsMatch(formInputs.newPassword === formInputs.confirmNewPassword);
  }, [formInputs.newPassword, formInputs.confirmNewPassword]);

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    currentPassword: '',
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

    function setError(field, message) {
      setErrorMessages(prevState => {
        return {
          ...prevState,
          [field]: message,
        };
      });
    }

    if (emailNotValid) {
      setError('email', 'Please enter a valid email.');
      return;
    }

    if (formInputs.newPassword && !formInputs.currentPassword) {
      setError('currentPassword', 'Please enter your current password.');
      return;
    }

    if (!formIsValid) return;

    const email = formInputs.email;
    const newPassword = passwordsMatch ? formInputs.newPassword : null;
    const currentPassword = formInputs.currentPassword;

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
        setIsBoardUpdated ? setIsBoardUpdated(true) : setBoardPageUpdated(true);
        closeModal();
      }
    } catch (err) {
      console.error(err);

      if (err.response.status === 401) {
        setError('currentPassword', err.response.data.msg);
      }

      if (err.response.status === 403 || err.response.status === 409) {
        setError('email', err.response.data.msg);
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
                  placeholder="name@email.com"
                  defaultValue={user.email}
                  onChange={handleInputChange}
                  onBlur={handleInputTouched}
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
                      errorMessages['currentPassword'] ||
                      errorMessages['password'] ||
                      currentPasswordNotValid
                        ? 'border-deleteRed'
                        : ''
                    }`}
                  />
                  {errorMessages['currentPassword'] && (
                    <span className="text-deleteRed text-xs flex pb-1">
                      {errorMessages['currentPassword']}
                    </span>
                  )}
                  {currentPasswordNotValid && (
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
                      newPasswordNotValid || !passwordsMatch
                        ? 'border-deleteRed'
                        : ''
                    }`}
                  />
                  {newPasswordNotValid && (
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
                      confirmNewPasswordNotValid || !passwordsMatch
                        ? 'border-deleteRed'
                        : ''
                    }`}
                  />
                  {confirmNewPasswordNotValid && (
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
