import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import video1 from '../video/1.mp4';
import video2 from '../video/2.mp4';
import video3 from '../video/3.mp4';

const slides = [
  { type: 'video', src: video3 },
  { type: 'video', src: video2 },
  { type: 'video', src: video1 },
  { type: 'image', src: video1 }, 
];

const Product = () => {
  return (
    <div className="w-full overflow-hidden m-0 p-0">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay, EffectFade]}
        className="w-full "
      >
        {slides.map(({ type, src }, index) => (
          <SwiperSlide key={index} className="w-full ">
            {type === 'image' ? (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
            ) : (
              <video
                src={src}
                className="w-full h-[250px] md:h-[400px] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={video1}  
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
