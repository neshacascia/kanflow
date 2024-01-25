import { useContext } from 'react';
import { Context } from '../context/Context';

import sunIcon from '../../public/assets/sun.svg';
import moonIcon from '../../public/assets/moon.svg';

export default function ToggleThemeButton() {
  const { toggleTheme, isDarkMode } = useContext(Context);

  return (
    <div className="bg-lightGrey dark:bg-veryDarkGrey flex justify-center gap-6 rounded-md py-3 mx-4">
      <img src={sunIcon} />

      <label className="w-12 h-6 relative inline-block">
        <input type="checkbox" className=" w-0 h-0 opacity-0" />
        <span
          onClick={toggleTheme}
          className={`slider round ${
            isDarkMode
              ? 'before:right-[4px] rightSlider'
              : 'before:left-[4px] leftSlider'
          }`}
        ></span>
      </label>

      <img src={moonIcon} />
    </div>
  );
}
