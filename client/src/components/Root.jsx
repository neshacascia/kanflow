import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';

export default function Root() {
  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </>
  );
}
