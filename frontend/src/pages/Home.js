import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

import ListItems from "../components/ListItems";
import CustomerSupport from "../components/CustomerSupport";
import ProductSection from "../components/ProductSection";

const newsDatas = [
    {
        news_id : 1,
        news_image: "https://cdn3008.cdn-template-4s.com/thumbs/tin-tuc/tt1_thumb_350.webp",
        news_title : "Hướng dẫn thay ruột vòi nước rửa chén tại nhàHướng dẫn thay ruột vòi nước rửa chén tại nhà" ,
        news_date: "18/07/2024",
        news_description: " Khi sử dụng  vòi nước rửa chén  trong thời gian dài, có thể xảy ra hiện tượng mòn và rỉ sét Khi sử dụng  vòi nước rửa chén  trong thời gian dài, có thể xảy ra hiện tượng mòn và rỉ sét ..."
    },
    {
        news_id : 2,
        news_image: "https://cdn3008.cdn-template-4s.com/thumbs/tin-tuc/kich-thuoc-chau-rua-chen-doi-1_thumb_350.webp",
        news_title : "Hướng dẫn thay ruột vòi nước rửa chén tại nhà ..." ,
        news_date: "18/07/2024",
        news_description: " Khi sử dụng  vòi nước rửa chén  trong thời gian dài, có thể xảy ra hiện tượng mòn và rỉ sét ..."
    },
    {
        news_id : 3,
        news_image: "https://cdn3008.cdn-template-4s.com/thumbs/tin-tuc/2710_mtknhceramic_thumb_350.webp",
        news_title : "Hướng dẫn thay ruột vòi nước rửa chén tại nhà ..." ,
        news_date: "18/07/2024",
        news_description: " Khi sử dụng  vòi nước rửa chén  trong thời gian dài, có thể xảy ra hiện tượng mòn và rỉ sét ..."
    },
    {
        news_id : 4,
        news_image: "https://cdn3008.cdn-template-4s.com/thumbs/tin-tuc/tt2_thumb_350.webp",
        news_title : "Hướng dẫn thay ruột vòi nước rửa chén tại nhà ..." ,
        news_date: "18/07/2024",
        news_description: " Khi sử dụng  vòi nước rửa chén  trong thời gian dài, có thể xảy ra hiện tượng mòn và rỉ sét ..."
    },
    {
        news_id : 5,
        news_image: "https://cdn3008.cdn-template-4s.com/thumbs/tin-tuc/1403_kiudngchyucabptlorcalhnhchnht_thumb_350.webp",
        news_title : "Hướng dẫn thay ruột vòi nước rửa chén tại nhà ..." ,
        news_date: "18/07/2024",
        news_description: " Khi sử dụng  vòi nước rửa chén  trong thời gian dài, có thể xảy ra hiện tượng mòn và rỉ sét ..."
    }
] 

const setTheme = [
    {
        title: "Sản phẩm mới",
        theme: "fa-solid fa-bolt",
        swiperButton: "newProducts", // tên biến 
    },
    {
        title: "Sản phẩm nổi bật",
        theme: "fa-solid fa-fire",
        swiperButton: "hotProducts",
    },
    {
        title: "Sản phẩm giảm giá",
        theme: "fa-solid fa-gift",
        swiperButton: "saleProducts",
    },
]

const Home = () => {

    const [products, setProducts] = useState({ newProducts: [], hotProducts: [], saleProducts: [] });
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/products/not-regular");
                setProducts({
                    newProducts: response.data.newProducts,
                    hotProducts: response.data.hotProducts,
                    saleProducts: response.data.saleProducts,
                });
            } catch (error) {
                console.error("Đã xảy ra lỗi khi gọi API products!", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home">
            <div className="home-intro bg-color-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ 
                                    delay: 5000,
                                    disableOnInteraction: false 
                                }}
                            >
                                <SwiperSlide>
                                    <div className="home-image">
                                        <img className="img-fluid" src="https://cdn3009.cdn-template-4s.com/media/banner/slide-2.webp" alt="img"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="home-image">
                                        <img className="img-fluid" src="https://cdn3009.cdn-template-4s.com/media/banner/slide-1.webp" alt="img"/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="banner-section">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="banner-item">
                                            <img className="img-fluid" src="https://cdn3009.cdn-template-4s.com/media/banner/banner-1.webp" alt="img"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="banner-item">
                                            <img className="img-fluid" src="https://cdn3009.cdn-template-4s.com/media/banner/banner-2.webp" alt="img"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="banner-item mb-0">
                                            <img className="img-fluid" src="https://cdn3009.cdn-template-4s.com/media/banner/banner-3.webp" alt="img"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-product">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="product-new">
                                {setTheme.map((theme, index)=> (
                                    <ProductSection
                                    key={index}
                                    title={theme.title}
                                    iconClass={theme.theme}
                                    swiperButton={theme.swiperButton}
                                    dataset={products[`${theme.swiperButton}`] || []}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-feedback bg-color-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-5 col-12">
                            <h3 className="title-feedback">
                                Cảm nhận của khách hàng
                            </h3>
                            <p className="text-feedback"> 
                                Những phản hồi khách quan về sản phẩm của chúng tôi.
                            </p>
                        </div>
                        <div className="col-lg-8 col-md-7 col-12">
                            <div className="feedback-list">
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={2}
                                    loop
                                    navigation
                                    autoplay={{ 
                                        delay: 5000,
                                        disableOnInteraction: false 
                                    }}
                                    breakpoints={{
                                        0: { // Với mọi kích thước màn hình
                                            slidesPerView: 1, // Điện thoại, chỉ hiện 1 slide
                                        },
                                        768: { // Màn hình từ 640px trở lên (tablet trở lên)
                                            slidesPerView: 2, // Hiện 2 slide như mặc định
                                        },
                                    }}
                                >
                                    <SwiperSlide>
                                        <div className="feedback-item">
                                            <div className="feedback-img">
                                                <img src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/top-36-anh-dai-dien-dep-cho-nu/anh-dai-dien-dep-cho-nu-che-mat-anime.jpg?1708401649581" alt="img"/>
                                            </div>
                                            <div className="feedback-name">
                                                <h4>Tương Tương</h4>
                                            </div>
                                            <div className="feedback-comment">
                                            Sản phẩm hoạt động tốt, máy chạy êm, giá cả hợp lí, nhân viên tư vấn nhiệt tình chu đáo, dịch vụ chăm sóc khách hàng tốt. Tôi sẽ giới thiệu cho người thân và bạn bè sử dụng.
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="feedback-item">
                                            <div className="feedback-img">
                                                <img src="https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-avatar-zalo-cute-nhat-cho-con-trai_052907656.jpg" alt="img"/>
                                            </div>
                                            <div className="feedback-name">
                                                <h4>Dương Đạt</h4>
                                            </div>
                                            <div className="feedback-comment">
                                            Đồ đẹp lắm nha, 1 năm ghé không biết bao nhiêu lần, lần nào mua cho người yêu mình cũng rất thích. Sẽ luôn ủng hộ.
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="feedback-item">
                                            <div className="feedback-img">
                                                <img src="https://cdn-media.sforum.vn/storage/app/media/THANHAN/2/2a/avatar-dep-100.jpg"/>
                                            </div>
                                            <div className="feedback-name">
                                                <h4>Minh Tiên</h4>
                                            </div>
                                            <div className="feedback-comment">
                                            Lần đầu vào tới thật sự rất bất ngờ, nhiều đồ lắm nha, các bạn nhân viên rất vui vẻ và tư vấn nhiệt tình.
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-news">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="topic">
                                <div className="topic-name">
                                    <h3>Tin tức mới nhất</h3>
                                </div>
                            </div>
                            <ListItems dataset={newsDatas} role={"news"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-customerSupport">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <CustomerSupport/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home