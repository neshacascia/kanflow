import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import Feature from '../components/Feature';

import data from '../../data.json';
import kanflow from '../../public/assets/app-dashboard.png';
import logo from '../../public/assets/logo.svg';

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
      const res = await axios.post(
        'https://kanflow-server.cyclic.app/api/login',
        {
          email: import.meta.env.VITE_DEMO_USER_EMAIL,
          password: import.meta.env.VITE_DEMO_USER_PASSWORD,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        navigate('/board');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {user === null && (
        <main>
          <section className="text-white bg-veryDarkGrey h-full relative flex flex-col items-center pt-20 md:pt-20">
            <h1 className="font-home text-4xl md:text-[55px] lg:text-6xl font-semibold tracking-wider leading-[65px] text-center md:w-[800px] pt-14">
              Unleash your <span className="gradient">productivity</span> with
              kanflow
            </h1>
            <p className="text-gray-400 md:text-[18px] text-center pt-4 px-6">
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

            <div className="lg:w-[1040px] py-20 px-6">
              <img
                src={kanflow}
                alt="Kanflow desktop dashboard"
                className="w-full rounded-lg"
              />
            </div>
          </section>

          <section
            id="features"
            className="bg-lightGrey flex flex-col px-6 lg:px-24 pb-20"
          >
            <h2 className="text-[#372c51] font-home text-3xl md:text-5xl font-semibold tracking-wider pt-20">
              Features&#8212;
            </h2>
            <p className="text-gray-800 md:text-[17px] tracking-wide md:w-[700px] pt-4">
              Kanflow embraces simiplicity and minimalism, providing users with
              a clean and easy-to-navigate workspace. By focusing on the
              essentials, we empower users with a solution that boosts
              productivity and promotes a smooth workflow.
            </p>

            <div className="grid md:grid-cols-2 justify-center gap-8 lg:gap-10 pt-16">
              {data.features.map((feature, ind) => (
                <Feature
                  key={ind}
                  icon={feature.icon}
                  attribute={feature.attribute}
                  alt={feature.attributeTitle}
                  heading={feature.heading}
                  description={feature.description}
                />
              ))}
            </div>
          </section>

          <footer className="text-white bg-veryDarkGrey flex items-center py-4 px-6">
            <img src={logo} className="z-10" />
            <p className="text-xl font-semibold tracking-wide px-4">kanflow</p>
            <div className="flex items-center gap-6 ml-auto">
              <Link
                to="/login"
                onClick={() => storeAuthValue('login')}
                className="text-sm tracking-wider"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => storeAuthValue('signup')}
                className="bg-mainPurple text-sm  tracking-wider py-2 px-4 rounded hover:bg-mainPurpleHover"
              >
                Signup
              </Link>{' '}
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
