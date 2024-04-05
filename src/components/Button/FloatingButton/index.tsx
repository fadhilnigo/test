import { ButtonHTMLAttributes } from 'react';
import PlusIcon from './assets/plusIcon.svg';

const FloatingButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="bg-[#e71d35] rounded-full w-[3.75rem] h-[3.75rem] flex items-center justify-center fixed right-[1.25rem] bottom-[1.25rem]"
    type="button"
    {...props}
  >
    <img
      className="w-[0.857rem] h-[0.875rem]"
      src={PlusIcon}
      alt="verified"
    />
  </button>
);

export default FloatingButton;
