import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import errorPage from '../../public/assets/404.svg';

export default function NotFoundPage() {
  return (
    <main className="bg-lightGrey h-screen flex flex-col-reverse justify-center gap-6 md:flex-row md:justify-around md:items-center pt-10 md:pt-20 md:px-10">
      <section className="text-darkGrey items-center flex flex-col md:items-start gap-6">
        <h1 className="text-4xl md:text-5xl font-semibold">Page Not Found</h1>
        <p className="text-lg text-center pb-12 md:text-left">
          Oops, we can't seem to find the page you're looking for!
        </p>
        <Link
          to="/"
          className="text-white bg-mainPurple tracking-wider py-3 px-6 rounded hover:bg-mainPurpleHover"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
          &nbsp;&nbsp;Go Back
        </Link>
      </section>

      <div className="bg-lightGrey w-full h-[50%] md:w-[55%] md:h-full">
        <a
          href="https://www.vecteezy.com/free-vector/404"
          className="h-full flex"
        >
          <img
            src={errorPage}
            alt="404 Vectors by Vecteezy"
            className="w-full"
          />
        </a>
      </div>
    </main>
  );
}
