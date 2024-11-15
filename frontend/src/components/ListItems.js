import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'
import Product from "./items/Product";
import News from "./items/News";

const ListItems = ({dataset, role, swiperButton = null, direction = "horizontal", spaceBetween = 20, slidesPerView = 4 }) => {

    return (
        <div className="listItems">
            <Swiper
                direction={direction}
                modules={[Navigation]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={swiperButton ? {
                    prevEl: `.${swiperButton}-prev`,
                    nextEl: `.${swiperButton}-next`,
                } : true }
                breakpoints={{
                    0: { // Với mọi kích thước màn hình
                        slidesPerView: 2, // Điện thoại, chỉ hiện 1 slide
                    },
                    776: { // Màn hình từ 640px trở lên (tablet trở lên)
                        slidesPerView: 3, // Hiện 2 slide như mặc định
                    },
                    1032: {
                        slidesPerView: 4,
                    }
                    // 1200: {
                    //     slidesPerView:5,
                    // }
                }}
            >
            {dataset && dataset.map((data, index) => (
                <SwiperSlide key={index}>
                    {role === "product" ? (
                        <Product dataProducts={data} />
                    ) : (
                        <News dataNews={data} />
                    )}
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )   
}

export default ListItems