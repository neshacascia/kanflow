import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

import kanflowImg from '../assets/kanflow-img.svg';

export default function AuthPage() {
  const { authValue, setAuthValue } = useContext(Context);

  function changeAuthValue() {
    setAuthValue(prevValue => {
      if (prevValue === 'Signup') {
        setAuthValue('Login');
      } else {
        setAuthValue('Signup');
      }
    });
  }

  return (
    <section className="h-screen relative flex items-center justify-evenly pt-16 md:pt-20">
      <img src={kanflowImg} className="h-80" />
      <div className="bg-[#E6E6E6] flex flex-col gap-3 rounded-md py-4 px-14">
        <h2 className="text-2xl font-semibold tracking-wide">
          {authValue === 'Login' ? 'Welcome back!' : 'Sign Up!'}
        </h2>
        <p className="text-sm">
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
          className="flex flex-col gap-3 pt-4"
        >
          <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
            Email Address
            <input
              type="email"
              name="email"
              className="bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple"
            />
          </label>
          <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
            Password
            <input
              type="password"
              name="password"
              className="bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple"
            />
          </label>
          {authValue === 'Signup' && (
            <label className="text-veryDarkGrey text-xs font-semibold flex flex-col gap-2">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                className="bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-2 px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple"
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

        <p>
          {authValue === 'Signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <Link
            to={authValue === 'Signup' ? '/login' : '/signup'}
            onClick={changeAuthValue}
          >
            {authValue === 'Signup' ? 'Login' : 'Signup'} Now
          </Link>
        </p>
      </div>
    </section>
  );
}
