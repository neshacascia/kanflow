import { useContext } from 'react';
import { Context } from '../context/Context';

export default function AuthPage() {
  const { authValue } = useContext(Context);

  return (
    <section>
      <div>
        <h2>{authValue}</h2>
        <p>
          {authValue === 'Signup'
            ? 'Enter your details to create an account'
            : 'Enter your details to log in to your account'}
        </p>

        {/* <% if (locals.messages.errors) { %> <% messages.errors.forEach( el => {
        %>
        <div class="text-red-500 text-sm"><%= el.msg %></div>
        <% }) %> <% } %> */}

        <form
          action={authValue === 'Signup' ? '/signup' : '/login'}
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
          <a href={authValue === 'Signup' ? '/signup' : '/login'}>
            {authValue === 'Signup' ? 'Login' : 'Signup'} Now
          </a>
        </p>
      </div>
    </section>
  );
}
