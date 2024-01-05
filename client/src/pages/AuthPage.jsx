import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

import kanflowImg from '../assets/kanflow-img.svg';

export default function AuthPage() {
  const { changeAuthValue } = useContext(Context);

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

  const [passwordsMatch, setPasswordsMatch] = useState();

  useEffect(() => {
    const arePasswordsEqual = enteredPassword === enteredConfirmPassword;
    setPasswordsMatch(arePasswordsEqual);
  }, [enteredPassword, enteredConfirmPassword]);

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    if (authValue === 'login') {
      if (
        enteredEmailValidation &&
        enteredEmailTouched &&
        enteredPasswordValidation &&
        enteredPasswordTouched
      ) {
        setFormIsValid(true);
      }
    } else {
      if (
        enteredEmailValidation &&
        enteredEmailTouched &&
        enteredPasswordValidation &&
        enteredPasswordTouched &&
        enteredConfirmPasswordValidation &&
        enteredConfirmPasswordTouched
      ) {
        setFormIsValid(true);
      }
    }
  }, [
    enteredEmailValidation,
    enteredEmailTouched,
    enteredPasswordValidation,
    enteredPasswordTouched,
    enteredConfirmPasswordValidation,
    enteredConfirmPasswordTouched,
  ]);

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

  const authValue = localStorage.getItem('authValue');

  return (
    <section className="h-screen relative flex flex-col items-center justify-center pt-16 md:flex-row md:justify-between lg:justify-between md:pt-20">
      <img src={kanflowImg} className="h-44 md:h-60 md:pl-4 lg:h-80 xl:pl-20" />
      <div className="md:bg-[#E6E6E6] md:w-[50%] md:h-full flex flex-col items-center md:items-stretch justify-center gap-3 rounded-lg py-5 md:py-8 md:px-10 lg:px-32">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
          {authValue === 'login' ? 'Welcome back!' : 'Sign Up!'}
        </h2>
        <p className="text-sm text-center md:text-start">
          {authValue === 'signup'
            ? 'Enter your details to create an account'
            : 'Please login to your account'}
        </p>

        {/* <% if (locals.messages.errors) { %> <% messages.errors.forEach( el => {
        %>
        <div class="text-red-500 text-sm"><%= el.msg %></div>
        <% }) %> <% } %> */}

        <form
          action={`/api/${authValue}`}
          method="POST"
          className="w-full flex flex-col gap-1 pt-2 md:gap-3 md:pt-4"
        >
          <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
            Email Address
            <input
              type="email"
              name="email"
              required
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                enteredEmailNotValid ? 'invalid:border-deleteRed' : ''
              }`}
            />
            {enteredEmailNotValid && (
              <span className="text-deleteRed flex">
                Missing required field.{' '}
                <span className="hidden md:block">
                  &nbsp;Please enter valid email.
                </span>
              </span>
            )}
          </label>
          <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
            Password
            <input
              type="password"
              name="password"
              required
              onChange={passwordChangeHandler}
              onBlur={passwordInputBlurHandler}
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                enteredPasswordNotValid ? 'invalid:border-deleteRed' : ''
              }`}
            />
            {enteredPasswordNotValid && (
              <span className="text-deleteRed flex">
                Please enter a valid password with a minimum of 8 characters.
              </span>
            )}
          </label>
          {authValue === 'signup' && (
            <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                required
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordInputBlurHandler}
                className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                  enteredConfirmPasswordNotValid
                    ? 'invalid:border-deleteRed'
                    : ''
                }`}
              />
              {enteredConfirmPasswordNotValid && (
                <span className="text-deleteRed flex">
                  Please enter a valid password with a minimum of 8 characters.
                </span>
              )}
            </label>
          )}
          {!passwordsMatch &&
            enteredPasswordTouched &&
            enteredConfirmPasswordTouched && (
              <span className="text-deleteRed text-xs font-semibold">
                Uh oh! The passwords you entered do not match.
              </span>
            )}
          <button
            type="submit"
            disabled={!formIsValid}
            className="text-white bg-mainPurple font-semibold tracking-wide leading-6 py-3 enabled:hover:bg-mainPurpleHover mt-5"
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
            onClick={() => changeAuthValue(authValue)}
          >
            {authValue === 'signup' ? 'Login' : 'Signup'} Now
          </Link>
        </p>
      </div>
    </section>
  );
}
