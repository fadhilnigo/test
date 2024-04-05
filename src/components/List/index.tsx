import { useEffect, useState } from 'react';
import { IPhotoRes } from '~/interface';

interface IListProps {
  photos: IPhotoRes[];
}

const PhotoList = ({ photos }: IListProps) => (
  <div className="flex flex-col gap-[0.563rem] basis-3/6">
    {
      photos.map((photo) => (
        <div key={photo.id}>
          <img
            className="rounded-lg w-full object-cover"
            alt={photo.title}
            src={photo.url}
          />
        </div>
      ))
    }
  </div>
);

const List = ({ photos }: IListProps) => {
  const [photoList, setPhotoList] = useState<{
    leftPhotos: IPhotoRes[],
    rightPhotos: IPhotoRes[]
  }>({
    leftPhotos: [],
    rightPhotos: [],
  });

  useEffect(() => {
    const leftPhotoList: IPhotoRes[] = [];
    const rightPhotoList: IPhotoRes[] = [];
    photos.forEach((photo, index) => {
      if (index % 2 === 0) {
        leftPhotoList.push(photo);
      } else {
        rightPhotoList.push(photo);
      }
    });
    setPhotoList({
      leftPhotos: leftPhotoList,
      rightPhotos: rightPhotoList,
    });
  }, [photos]);

  return (
    <main className="p-[1.25rem] flex gap-[0.625rem]">
      <PhotoList photos={photoList.leftPhotos} />
      <PhotoList photos={photoList.rightPhotos} />
    </main>
  );
};

export default List;
