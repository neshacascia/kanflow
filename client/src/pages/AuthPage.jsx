import { useState, useContext } from 'react';
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
  const enteredEmailIsValid = !enteredEmailValidation && enteredEmailTouched;

  const enteredPasswordValidation =
    enteredPassword.trim() !== '' && enteredPassword.length >= 8;
  const enteredPasswordIsValid =
    !enteredPasswordValidation && enteredPasswordTouched;

  const enteredConfirmPasswordValidation =
    enteredConfirmPassword.trim() !== '' && enteredConfirmPassword.length >= 8;
  const enteredConfirmPasswordIsValid =
    !enteredConfirmPasswordValidation && enteredConfirmPasswordTouched;

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
          {authValue === 'Login' ? 'Welcome back!' : 'Sign Up!'}
        </h2>
        <p className="text-sm text-center md:text-start">
          {authValue === 'Signup'
            ? 'Enter your details to create an account'
            : 'Please login to your account'}
        </p>

        {/* <% if (locals.messages.errors) { %> <% messages.errors.forEach( el => {
        %>
        <div class="text-red-500 text-sm"><%= el.msg %></div>
        <% }) %> <% } %> */}

        <form
          action={authValue === 'Signup' ? '/api/signup' : '/api/login'}
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
                enteredEmailIsValid ? 'invalid:border-deleteRed' : ''
              }`}
            />
          </label>
          <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
            Password
            <input
              type="password"
              name="password"
              required
              minLength={8}
              onChange={passwordChangeHandler}
              onBlur={passwordInputBlurHandler}
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                enteredPasswordIsValid ? 'invalid:border-deleteRed' : ''
              }`}
            />
          </label>
          {authValue === 'Signup' && (
            <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={8}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordInputBlurHandler}
                className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                  enteredConfirmPasswordIsValid
                    ? 'invalid:border-deleteRed'
                    : ''
                }`}
              />
            </label>
          )}
          <button
            type="submit"
            className="text-white bg-mainPurple font-semibold tracking-wide leading-6 py-3 hover:bg-mainPurpleHover mt-5"
          >
            {authValue}
          </button>
        </form>

        <p className="text-gray-700 text-sm pt-2 md:pt-6">
          {authValue === 'Signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <Link
            className="text-black font-semibold"
            to={authValue === 'Signup' ? '/login' : '/signup'}
            onClick={() => changeAuthValue(authValue)}
          >
            {authValue === 'Signup' ? 'Login' : 'Signup'} Now
          </Link>
        </p>
      </div>
    </section>
  );
}
