import { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

export default function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setAuthValue } = useContext(Context);
  const user = localStorage.getItem('user');

  if (user) {
    setIsLoggedIn(true);
    navigate('/board');
  }

  return (
    <>
      {user === null && (
        <main>
          <nav>
            <Link to="/login" onClick={() => setAuthValue('Login')}>
              Login
            </Link>
            <Link to="/signup" onClick={() => setAuthValue('Signup')}>
              Signup
            </Link>{' '}
          </nav>
          <h1>Unleash Your Productivity with kanflow</h1>
        </main>
      )}
    </>
  );
}
