import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

export default function Navbar() {
  const { isLoggedIn } = useContext(Context);

  return <nav>{isLoggedIn && <Link to="/logout">Logout</Link>}</nav>;
}
