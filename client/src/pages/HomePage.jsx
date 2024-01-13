import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import Feature from '../components/Feature';

import data from '../../data.json';
import kanflow from '../assets/app-dashboard.png';

export default function HomePage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, storeAuthValue } = useContext(Context);
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
        <main>
          <section className="text-white bg-veryDarkGrey h-full relative flex flex-col items-center pt-16 md:pt-20">
            <h1 className="font-home text-6xl font-semibold tracking-wider leading-[65px] text-center w-[800px] pt-14">
              Unleash your <span className="gradient">productivity</span> with
              kanflow
            </h1>
            <p className="text-gray-400 text-[18px] pt-4">
              The ultimate kanban task management solution for seamless and
              efficient workflow.
            </p>

            <div className="flex items-center gap-6 pt-10">
              <Link
                to="/signup"
                onClick={() => storeAuthValue('signup')}
                className="bg-mainPurple tracking-wider rounded py-3 px-8 hover:bg-mainPurpleHover"
              >
                Get Started
              </Link>{' '}
              <button
                onClick={demoUserLogin}
                className="tracking-wider border border-[#4568dc] rounded py-3 px-8"
              >
                Explore Demo
              </button>
            </div>

            <div className="w-[1040px] py-20">
              <img src={kanflow} className="w-full rounded-lg" />
            </div>
          </section>

          <section className="bg-lightGrey flex flex-col px-40">
            <h2 className="text-[#273762] font-home text-5xl font-semibold tracking-wider pt-20">
              Features&#8212;
            </h2>
            <p className="text-gray-800 text-[17px] tracking-wide w-[700px] pt-4">
              Kanflow embraces simiplicity and minimalism, providing users with
              a clean and easy-to-navigate workspace. By focusing on the
              essentials, we empower users with a solution that boosts
              productivity and promotes a smooth workflow
            </p>

            <div className="grid grid-cols-2 justify-center gap-8 pt-16">
              {data.features.map((feature, ind) => (
                <Feature
                  key={ind}
                  heading={feature.heading}
                  description={feature.description}
                />
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
}
