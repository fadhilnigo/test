import { IUserInfo } from '~/interface';
import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import EmailIcon from './assets/emailIcon.svg';
import LocationIcon from './assets/locationIcon.svg';
import MenuIcon from './assets/menuIcon.svg';
import verifiedIcon from './assets/verifiedIcon.svg';

interface IProfileProps {
  userInfo: IUserInfo
}

const ScrollDifferenceThreshold = 50;

const Profile = ({ userInfo }: IProfileProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentHeight, setCurrentHeigth] = useState(window.scrollY);

  const handleScroll = useCallback(() => {
    const isHasBigDifference = Math.abs(window.scrollY - currentHeight) > ScrollDifferenceThreshold;
    if (window.scrollY > currentHeight && isHasBigDifference) {
      setIsVisible(false);
      setCurrentHeigth(window.scrollY);
    }
    if (window.scrollY < currentHeight && isHasBigDifference) {
      setIsVisible(true);
      setCurrentHeigth(window.scrollY);
    }
  }, [currentHeight]);

  useEffect(() => {
    setCurrentHeigth(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-white px-[1.25rem] pt-[2.25rem] pb-[7.375rem]">
      <div className={cx(
        'flex gap-[1.25rem] transition-all overflow-hidden',
        { 'max-h-[10rem]': isVisible },
        { 'max-h-0': !isVisible },
      )}
      >
        <div className="w-[2.5rem] h-[2.5rem] shrink-0">
          <img
            className="w-full rounded-full object-cover"
            src={userInfo.profilePic}
            alt={`${userInfo.name} profilePic`}
          />
        </div>
        <div className="grow space-y-[0.25rem]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[1rem]">
              <h1 className="font-semibold text-[1.25rem]">{userInfo.name}</h1>
              <img
                className="w-[1rem] h-[1rem]"
                src={verifiedIcon}
                alt="verified"
              />
            </div>
            <img
              className="w-[1.25rem] h-[1rem]"
              src={MenuIcon}
              alt="menu"
            />
          </div>

          <p className="text-[0.75rem] text-[#969696]">{userInfo.profession}</p>

          <div className="flex items-center gap-[0.938rem]">
            <div className="flex items-center gap-[0.688rem]">
              <img
                className="w-[0.375rem] h-[0.5rem]"
                src={LocationIcon}
                alt="location"
              />
              <p className="text-[0.688rem] text-[#969696]">{userInfo.location}</p>
            </div>
            <div className="flex items-center gap-[0.688rem]">
              <img
                className="w-[0.688remrem] h-[0.5rem]"
                src={EmailIcon}
                alt="email"
              />
              <p className="text-[0.688rem] text-[#969696]">{userInfo.email}</p>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
