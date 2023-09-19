"use client";
// // Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as RCarousel } from "react-responsive-carousel";

export const Carousel = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  return (
    <RCarousel showStatus={false}>
      {images?.map((image, id) => (
        <div key={id}>
          <img
            style={{ maxHeight: 400, objectFit: "contain" }}
            src={image}
            alt="image"
          />
          <p className="legend">
            {name} {id + 1}
          </p>
        </div>
      ))}
    </RCarousel>
  );
};
