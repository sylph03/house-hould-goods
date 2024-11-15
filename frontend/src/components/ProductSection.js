import React from "react";
import ListItems from "./ListItems";

const ProductSection = ({ title, iconClass, swiperButton, dataset }) => (
    <div className="product-section">
        <div className="title-link">
            <div className="theme">
                <i className={iconClass}></i>
                <h3 className="title-section d-inline">{title}</h3>
            </div>
            <div className={`swiper-navigation swiper-navigation-custom ${swiperButton}-navigation`}>
                <div className={`swiper-button-prev ${swiperButton}-prev`}>
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className={`swiper-button-next ${swiperButton}-next`}>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>
        <ListItems dataset={dataset} role={"product"} swiperButton={swiperButton} />
    </div>
);

export default ProductSection