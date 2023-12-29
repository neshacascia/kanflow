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
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">
          {authValue === 'Login' ? 'Welcome back!' : 'Sign Up!'}
        </h2>
        <p>
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
        >
          <input type="text" name="userName" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <button type="submit">{authValue}</button>
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
