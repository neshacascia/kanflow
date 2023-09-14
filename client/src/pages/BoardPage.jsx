import { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';
import MenuModal from '../components/MenuModal';

export default function BoardPage() {
  const { setIsLoggedIn, displayMenuModal, setDisplayMenuModal } =
    useContext(Context);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const res = await axios.get('/user', { withCredentials: true });
        const { user } = res.data;

        if (user) {
          setIsLoggedIn(true);
          localStorage.setItem('user', true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkAuthentication();
  }, []);

  return (
    <main>
      <h1>Platform Launch Board</h1>
      {displayMenuModal && (
        <MenuModal setDisplayMenuModal={setDisplayMenuModal} />
      )}
    </main>
  );
}
