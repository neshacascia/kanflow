import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function DefaultAvatar({ size, avatar }) {
  return (
    <div
      className={`bg-[#706dc2da] w-${size} h-${size} flex justify-center items-center rounded-full mr-2`}
    >
      <FontAwesomeIcon
        icon={faUser}
        className={`text-white ${avatar ? avatar : 'text-lg'}`}
      />
    </div>
  );
}
