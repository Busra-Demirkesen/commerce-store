'use client';

import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { Image as ImageType } from '@/types';
import GalleryTab from './gallery-tab';

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="w-full">

      <Tab.Group as="div" className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-8">
  {}
  <div className="w-full lg:w-1/2">
    {}
    <Tab.Panels className="w-full mb-4">
      {images.map((image) => (
        <Tab.Panel key={image.id}>
          <div className="aspect-square relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            />
          </div>
        </Tab.Panel>
      ))}
    </Tab.Panels>

    {}
    <div className="mx-auto mt-2 hidden w-full max-w-2xl sm:block lg:max-w-none">
      <Tab.List className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <GalleryTab key={image.id} image={image} />
        ))}
      </Tab.List>
    </div>
  </div>

  {}
  {}
</Tab.Group>

    </div>
  );
};

export default Gallery;
