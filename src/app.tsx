import { useEffect, useState } from 'react';
import { IPhotoRes, IUserInfo } from './interface';
import List from './components/List';
import Profile from './components/Profile';
import FloatingButton from './components/Button/FloatingButton';
import Carousel from './components/Carousel';

const USER_MOCK_DATA: IUserInfo = {
  profilePic: 'https://via.placeholder.com/600/121fa4',
  name: 'Melanie Tan',
  profession: 'Professional Food Photographer',
  location: 'Bangkok',
  email: 'melanietan99@gmail.com',
};

const App = () => {
  const [activeAlbum, setActiveAlbum] = useState(0);
  const [photos, setPhotos] = useState<IPhotoRes[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<IPhotoRes[]>([]);
  const [carouselPhotos, setCarouselPhotos] = useState<IPhotoRes[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((data: IPhotoRes[]) => {
        setPhotos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setSelectedPhotos(photos.filter((item) => item.albumId === activeAlbum));
  }, [photos, activeAlbum]);

  useEffect(() => {
    if (photos.length) {
      const existItem: { [key:string]: boolean } = {};
      const carouselItems = [];
      while (carouselItems.length < 10) {
        const photo = photos[Math.floor(Math.random() * photos.length)];
        if (!existItem[photo.albumId]) {
          if (!carouselItems.length) {
            setActiveAlbum(photo.albumId);
          }
          carouselItems.push(photo);
          existItem[String(photo.albumId)] = true;
        }
      }
      setCarouselPhotos(carouselItems);
    }
  }, [photos]);

  return (
    <>
      <div className="sticky top-0">
        <Profile userInfo={USER_MOCK_DATA} />
        <Carousel photos={carouselPhotos} setActiveAlbum={setActiveAlbum} />
      </div>
      <List photos={selectedPhotos} />
      <FloatingButton />
    </>

  );
};

export default App;
