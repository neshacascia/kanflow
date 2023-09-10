import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

export default function Navbar() {
  const { setAuthValue } = useContext(Context);

  return (
    <nav>
      <Link to="/login" onClick={() => setAuthValue('Login')}>
        Login
      </Link>
      <Link to="/signup" onClick={() => setAuthValue('Signup')}>
        Signup
      </Link>
    </nav>
  );
}
