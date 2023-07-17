import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/Config";
import "./Carousel.css";
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
  const [carousel, setCarousel] = useState();

  const fetchImage = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=4fde116eb2b94e94d1a37a427a3981ba&language=en-US`
    );
    const data = await response.json();
    setCarousel(data.cast);
    // console.log(data.cast);
  };

  const items = carousel?.map((element) => {
    return (
      <div className="carouselItems">
        <img className="carouselImg"
          src={
            element.profile_path
              ? `${img_300}/${element.profile_path}`
              : noPicture
          }
          onDragStart={handleDragStart}
          role="presentation"
          alt=""
        />
        <b className="carouselName">{element?.name}</b>
      </div>
    );
  });

  console.log(items);
  useEffect(() => {
    fetchImage();
  }, []);

  const responsive = {
    0: { items: 3 },
    800: { items: 5 },
    2000: { items: 7 },
  };

  return (
    <AliceCarousel
      responsive={responsive}
      autoPlay
      infinite
      disableButtonsControls
      disableDotsControls
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
