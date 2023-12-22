import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';

export default function HomePage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthValue } = useContext(Context);
  const user = localStorage.getItem('user');

  if (user) {
    setIsLoggedIn(true);
    navigate('/board');
  }

  async function demoUserLogin() {
    try {
      const res = await axios.post('/api/login', {
        email: import.meta.env.VITE_DEMO_USER_EMAIL,
        password: import.meta.env.VITE_DEMO_USER_PASSWORD,
      });
      navigate('/board');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {user === null && (
        <main className="h-screen relative pt-16 md:pt-20">
          <Link to="/login" onClick={() => setAuthValue('Login')}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setAuthValue('Signup')}>
            Signup
          </Link>{' '}
          <button onClick={demoUserLogin}>Demo</button>
          <h1>Unleash Your Productivity with kanflow</h1>
        </main>
      )}
    </>
  );
}
