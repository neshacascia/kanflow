import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

export default function Navbar() {
  const { isLoggedIn, setAuthValue } = useContext(Context);

  return (
    <nav>
      {!isLoggedIn ? (
        <div>
          <Link to="/login" onClick={() => setAuthValue('Login')}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setAuthValue('Signup')}>
            Signup
          </Link>{' '}
        </div>
      ) : (
        <Link to="/logout">Logout</Link>
      )}
    </nav>
  );
}
