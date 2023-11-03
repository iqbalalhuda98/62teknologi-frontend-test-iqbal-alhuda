import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const SlideshowPhoto = (props) => {
  const { photo } = props;
  const photos = [...photo, ...photo];

  return (
    <div className="mx-auto">
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect={"coverflow"}
        loop={true}
        spaceBetween={19}
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
        }}
        className="coverflow"
      >
        {photos.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt={`${item}-${index}`}
                className="w-[550px] h-[500px] mx-auto object-cover rounded-lg"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideshowPhoto;
