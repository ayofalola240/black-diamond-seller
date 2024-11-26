"use client";
import { TImage } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  images: TImage[];
}

export const Carousel = ({ images }: IProps) => {
  const [currentIndex, setSelectedIndex] = useState(0);
  if (images.length === 0) return;

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="w-full  h-[300px] relative sm:h-[592px]">
        <Image className="object-contain " fill alt="Test" src={images[currentIndex].image_url} />
      </div>
      <section className="grid grid-cols-little-image gap-1 sm:gap-4">
        {images.map((image, index) => (
          <button onClick={() => setSelectedIndex(index)} key={index} className="relative w-full h-[80px]">
            <Image fill className="object-contain" alt={image.id} src={image.image_url} />
          </button>
        ))}
      </section>
    </section>
  );
};
