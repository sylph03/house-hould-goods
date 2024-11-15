import React, {useState, useEffect, useContext} from "react";
import { FavoriteContext } from '../contexts/FavoriteContext';

const Product = ({ dataProducts }) => {

    const { favorites, addToFavorites, removeFavorites } = useContext(FavoriteContext);

    const formatPrice = (price) => {
        // Sử dụng Intl.NumberFormat để định dạng số với dấu phân cách hàng nghìn
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const isFavorite =  favorites.some(item => item.product_id === dataProducts.product_id);

    // Hàm xử lý sự kiện yêu thích sản phẩm
    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFavorites(dataProducts.product_id);
        } else {
            addToFavorites(dataProducts.product_id);
        }
    };


    return (
        <div className="product-item wrp-effect-scale wrp-effect-boxshadow">
            <div className="inner-image">
                <div className="ratio-1-1">
                    <a href={`/product/${dataProducts.product_id}`} title={dataProducts.product_name}>
                        <img className="img-fluid" src={dataProducts.product_image_url}/>
                    </a>
                </div>
            </div>
            <div className="product-item__content">
                <h4 className="product-name">
                    <a href={`/product/${dataProducts.product_id}`}>
                        {dataProducts.product_name}
                    </a>
                </h4>
                <div className="product-price">
                    <span className="price-amount">
                        {formatPrice(dataProducts.price)}
                        <span className="currency-symbol">VND</span>
                    </span>
                    {dataProducts.old_price && 
                        <span className="price-amount old-price">
                            {formatPrice(dataProducts.old_price)}
                            <span className="currency-symbol">VND</span>
                        </span>
                    }
                </div>
                <div className="product-action">
                    <div className="favorites" onClick={handleToggleFavorite}>
                        <i className={`${isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} me-2`} style={{ color: isFavorite ? "#FF4D4D" : "inherit" }} ></i>
                        { isFavorite?
                        "Đã thích" : "Thích"
                        }
                    </div>
                    <div className="buy-now">
                        <i className="fa-solid fa-basket-shopping"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product