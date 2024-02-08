import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import { baseURL } from '../api';

import kanflowImg from '../../public/assets/kanflow-img.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function AuthPage() {
  const authValue = localStorage.getItem('authValue');
  const { changeAuthValue } = useContext(Context);
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredConfirmPasswordTouched, setEnteredConfirmPasswordTouched] =
    useState(false);

  const enteredEmailValidation =
    enteredEmail.trim() !== '' && enteredEmail.includes('@');
  const enteredEmailNotValid = !enteredEmailValidation && enteredEmailTouched;

  const enteredPasswordValidation =
    enteredPassword.trim() !== '' && enteredPassword.length >= 8;
  const enteredPasswordNotValid =
    !enteredPasswordValidation && enteredPasswordTouched;

  const enteredConfirmPasswordValidation =
    enteredConfirmPassword.trim() !== '' && enteredConfirmPassword.length >= 8;
  const enteredConfirmPasswordNotValid =
    !enteredConfirmPasswordValidation && enteredConfirmPasswordTouched;

  const formIsValid =
    authValue === 'login'
      ? enteredEmailValidation && enteredPasswordValidation
      : enteredEmailValidation &&
        enteredPasswordValidation &&
        enteredConfirmPasswordValidation;

  const [passwordsMatch, setPasswordsMatch] = useState();

  useEffect(() => {
    const arePasswordsEqual = enteredPassword === enteredConfirmPassword;
    setPasswordsMatch(arePasswordsEqual);
  }, [enteredPassword, enteredConfirmPassword]);

  const [errorMessages, setErrorMessages] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  function emailChangeHandler(e) {
    setEnteredEmail(e.target.value);
  }

  function passwordChangeHandler(e) {
    setEnteredPassword(e.target.value);
  }

  function confirmPasswordChangeHandler(e) {
    setEnteredConfirmPassword(e.target.value);
  }

  function emailInputBlurHandler() {
    setEnteredEmailTouched(true);
  }

  function passwordInputBlurHandler() {
    setEnteredPasswordTouched(true);
  }

  function confirmPasswordInputBlurHandler() {
    setEnteredConfirmPasswordTouched(true);
  }

  function changeAuthMethod() {
    setPasswordsMatch(true);
    changeAuthValue(authValue);
  }

  function handleTogglePassword() {
    setPasswordVisibility(prevState => !prevState);
  }

  function handleToggleConfirmPassword() {
    setConfirmPasswordVisibility(prevState => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseURL}/${authValue}`,
        {
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        navigate('/board');
      }
    } catch (err) {
      console.error(err);
      setErrorMessages(err.response.data.msg);
    }
  }

  return (
    <section className="h-screen relative flex flex-col items-center justify-center pt-44 mb-28 md:flex-row md:justify-between lg:justify-between md:pt-20 md:-mb-28">
      <img src={kanflowImg} className="h-44 md:h-60 md:pl-4 lg:h-80 xl:pl-20" />
      <div className="md:bg-[#E6E6E6] md:w-[45%] md:h-full flex flex-col items-center md:items-center justify-center gap-3 rounded-lg py-5 md:py-8 md:px-4">
        <h2 className="text-xl font-home md:text-3xl font-bold tracking-wide">
          {authValue === 'login' ? 'Login' : 'Create an Account'}
        </h2>

        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col items-center gap-4 pt-2 md:gap-5 md:pt-2 max-w-[400px]"
        >
          <label className="text-veryDarkGrey text-[13px] font-semibold w-72 flex flex-col gap-2 md:w-full">
            Email Address
            <input
              type="email"
              name="email"
              placeholder="name@email.com"
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-[10px] px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                enteredEmailNotValid ? 'border-deleteRed' : 'border-gray-300'
              }`}
            />
            {enteredEmailNotValid && (
              <span className="text-deleteRed text-xs flex pb-1">
                Please enter a valid email.
              </span>
            )}
          </label>
          <label className="text-veryDarkGrey text-[13px] font-semibold w-72 flex flex-col gap-2 md:w-full">
            Password
            <div
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 flex items-center justify-between border-[1px] rounded focus-within:ring-1 focus-within:ring-mainPurple ${
                enteredPasswordNotValid ? 'border-deleteRed' : 'border-gray-300'
              }`}
            >
              {' '}
              <input
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                onChange={passwordChangeHandler}
                onBlur={passwordInputBlurHandler}
                className="w-full h-full rounded py-[13px] px-4 focus:outline-none"
              />
              <FontAwesomeIcon
                icon={passwordVisibility ? faEyeSlash : faEye}
                onClick={handleTogglePassword}
                className="text-gray-400 pr-4 cursor-pointer"
              />
            </div>
            {enteredPasswordNotValid && (
              <span className="text-deleteRed text-xs flex pb-1">
                Password must have a minimum of 8 characters.
              </span>
            )}
          </label>
          {authValue === 'signup' && (
            <label className="text-veryDarkGrey text-[13px] font-semibold w-72 flex flex-col gap-2 md:w-full">
              Confirm Password
              <div
                className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 flex items-center justify-between border-[1px] rounded focus-within:ring-1 focus-within:ring-mainPurple ${
                  enteredConfirmPasswordNotValid
                    ? 'border-deleteRed'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type={confirmPasswordVisibility ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordInputBlurHandler}
                  className="w-full h-full rounded py-[13px] px-4 focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={confirmPasswordVisibility ? faEyeSlash : faEye}
                  onClick={handleToggleConfirmPassword}
                  className="text-gray-400 pr-4 cursor-pointer"
                />
              </div>
              {enteredConfirmPasswordNotValid && (
                <span className="text-deleteRed text-xs flex">
                  Password must have a minimum of 8 characters.
                </span>
              )}
            </label>
          )}
          {authValue === 'signup' &&
            !passwordsMatch &&
            enteredPasswordTouched &&
            enteredConfirmPasswordTouched && (
              <span className="text-deleteRed text-xs font-semibold">
                Uh oh! The passwords you entered do not match.
              </span>
            )}
          {errorMessages && (
            <p className="text-deleteRed text-xs font-semibold">
              {errorMessages}
            </p>
          )}
          <button
            type="submit"
            disabled={!formIsValid}
            className="text-white bg-mainPurple font-semibold tracking-wide leading-6 py-3 enabled:hover:bg-mainPurpleHover mt-5 w-full"
          >
            {authValue === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        <p className="text-gray-700 text-sm pt-2 md:pt-6">
          {authValue === 'signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <Link
            className="text-black font-semibold"
            to={authValue === 'signup' ? '/login' : '/signup'}
            onClick={changeAuthMethod}
          >
            {authValue === 'signup' ? 'Login' : 'Signup'} Now
          </Link>
        </p>
      </div>
    </section>
  );
}
