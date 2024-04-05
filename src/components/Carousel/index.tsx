// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import cx from 'classnames';
import { IPhotoRes } from '~/interface';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface ICarouselProps {
  photos: IPhotoRes[];
  setActiveAlbum: Dispatch<SetStateAction<number>>;
}

const SwiperItem = ({ item, setActiveAlbum } : { item: IPhotoRes, setActiveAlbum: Dispatch<SetStateAction<number>> }) => {
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    setActiveAlbum(item.albumId);
  }, [swiperSlide.isActive]);

  return (
    <div className={cx(
      'transition-all rounded-lg object-cover',
      {
        'w-[11.25rem] h-[8.75rem] bg-[#f89f1e] drop-shadow-[0_5px_10px_0_rgba(255,151,0,0.3)]': swiperSlide.isActive,
        'w-[8.75rem] h-[6.25rem]': !swiperSlide.isActive,
      },
    )}
    >
      <img
        className={cx(
          'object-cover',
          {
            'rounded-lg w-full h-full': !swiperSlide.isActive,
            'rounded-lg rounded-br-none w-[11.25rem] h-[6.25rem]': swiperSlide.isActive,
          },
        )}
        src={item.thumbnailUrl}
        alt={item.title}
      />
      {swiperSlide.isActive && (<p className="text-white text-[0.688rem] ml-[0.625rem]">{item.title}</p>)}
    </div>
  );
};

const Carousel = ({ photos, setActiveAlbum } : ICarouselProps) => (
  <div className="mt-[-6rem] min-h-[8.75rem]">
    <Swiper
      slidesPerView={2}
      centeredSlides
    >
      {photos.map((item) => (
        <SwiperSlide key={item.id} virtualIndex={item.albumId}>
          <SwiperItem item={item} setActiveAlbum={setActiveAlbum} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

);

export default Carousel;
