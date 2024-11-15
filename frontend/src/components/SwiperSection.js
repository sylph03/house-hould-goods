import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperSection = ({ slides, autoplay = true, loop = true, pagination = true, navigation = true }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={loop}
            navigation={navigation}
            pagination={pagination ? { clickable: true } : false}
            autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="home-image">
                        <img className="img-fluid" src={slide.image} alt={slide.alt} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperSection;
