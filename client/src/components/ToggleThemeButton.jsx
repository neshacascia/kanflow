import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';

export default function ToggleThemeButton() {
  return (
    <div className="bg-veryDarkGrey flex justify-center gap-6 rounded-md py-4 mx-4">
      <img src={sunIcon} />

      <label className="w-12 h-6 relative inline-block">
        <input type="checkbox" className=" w-0 h-0 opacity-0" />
        <span className="slider round"></span>
      </label>

      <img src={moonIcon} />
    </div>
  );
}
