"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50">
      <div className="container mx-auto max-w-7xl pb-10 px-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-6">Gallery</h3>
          {images.length > 0 ? (
            <Gallery>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {images.map((image, index) => (
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                    key={index}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        className="object-cover h-[250px] relative w-full rounded-md hover:scale-102 transition-all duration-500 cursor-pointer"
                        width="1800"
                        height="400"
                        priority={true}
                      />
                    )}
                  </Item>
                ))}
              </div>
            </Gallery>
          ) : (
            <div className="text-center text-gray-500">
              No images available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyImages;
