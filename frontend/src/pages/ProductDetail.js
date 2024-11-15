import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { useParams } from 'react-router-dom';
import ListItems from "../components/ListItems";
import { FavoriteContext } from "../components/contexts/FavoriteContext";

const ProductDetail = () => {

    const { product_id } = useParams();
    const [productDetail, setProductDetail] = useState([]);
    const [productRelated, setProductRelated] = useState([]);
    const { favorites, addToFavorites, removeFavorites } = useContext(FavoriteContext);

    const isFavorite =  favorites.some(item => item.product_id === productDetail.product_id);

    // Hàm xử lý sự kiện yêu thích sản phẩm
    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFavorites(productDetail.product_id);
        } else {
            addToFavorites(productDetail.product_id);
        }
    };

    // Hàm gọi API chung cho cả productDetail và productRelated
    const fetchProductData = async () => {
        try {
            const [detailResponse, relatedResponse] = await Promise.all([
                axios.get(`http://localhost:3000/products/detail/${product_id}`),
                axios.get(`http://localhost:3000/products/related/${product_id}`)
            ]);
            setProductDetail(detailResponse.data);
            setProductRelated(relatedResponse.data);
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        }
    };

    // Sử dụng useEffect để gọi API khi product_id thay đổi
    useEffect(() => {
        fetchProductData();
    }, [product_id]);

    const formatPrice = (price) => {
        // Sử dụng Intl.NumberFormat để định dạng số với dấu phân cách hàng nghìn
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="product-detail">
            <div className="container">
                <div className="col-12">
                    <div className="product-detail-head">
                        <div className="row">
                            <div className="col-lg-5 col-sm-6 col-12">
                                <div className="product-image-detail">
                                    <div className="inner-image">
                                        <img className="img-fluid" src={productDetail.product_image_url} alt={productDetail.product_name}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-sm-6 col-12">
                                <div className="box-product-info-detail">
                                    <h1 className="product-title-detail">{productDetail.product_name ? productDetail.product_name : ""}</h1>
                                    <div className="product-rating">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <div className="product-rating-action row">
                                        <div className="col-6">
                                            <label>Danh mục:&nbsp;&nbsp;</label>
                                            <span>{productDetail.category_name}</span>
                                        </div>
                                        <div className="col-6"> 
                                            <label>Thương hiệu:&nbsp;&nbsp;</label>
                                            <span>{productDetail.brand_name}</span>
                                        </div>
                                        <div className="col-6"> 
                                            <label>Mã sản phẩm:&nbsp;&nbsp;</label>
                                            <span>{productDetail.product_id}</span>
                                        </div>
                                        <div className="col-6"> 
                                            <label>Tình trạng:&nbsp;&nbsp;</label>
                                            <span>{productDetail.stock > 0 ? "Còn hàng" : "Hết hàng" }</span>
                                        </div>
                                    </div>
                                    <div className="price">
                                        <span className="price-amount">
                                            <span>{formatPrice(productDetail.price)}</span>
                                            <span className="currency-symbol">VND</span>
                                        </span>
                                        {productDetail.old_price && 
                                        <span className="price-amount old-price">
                                            <span>{formatPrice(productDetail.old_price)}</span>
                                            <span className="currency-symbol">VND</span>
                                        </span>
                                        }
                                    </div>
                                    <div className="box-product-action">
                                        <div className="product-quantity">
                                            <span className="btn-quantity quantity-subtract">
                                                <i className="fa-solid fa-minus"></i>
                                            </span>
                                            <input value={1} className="text-center number-input" type="text" maxLength="3" inputMode="decimal"/>
                                            <span className="btn-quantity quantity-add">
                                                <i className="fa-solid fa-plus"></i>
                                            </span>
                                        </div>
                                        <div className="product-action-detail">
                                            <div className="btn-cart-buy">
                                                <a href="" className="add-to-cart">Thêm vào giỏ hàng</a>
                                                <a href="" className="add-to-cart add-to-card-buy">Thanh toán ngay</a>
                                            </div>
                                            <a className="btn-product-action" onClick={handleToggleFavorite}>
                                                <i className="fa-solid fa-heart" style={{color : isFavorite ? "#FF4D4D" : "inherit" }}></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="product-description-detail">
                                        <div className="title">Mô tả</div>
                                        <div className="content">
                                            <div dangerouslySetInnerHTML={{ __html: productDetail.product_description }} />
                                        </div>
                                    </div>
                                    <div className="social-share">
                                        <span className="title">Chia sẻ:</span>   
                                        <div className="list-social">
                                            <div className="btn-social">
                                                <a href="">
                                                    <i className="fa-brands fa-facebook-f"></i>
                                                </a>
                                            </div>
                                            <div className="btn-social">
                                                <a href="">
                                                    <i className="fa-brands fa-twitter"></i>
                                                </a>
                                            </div>
                                            <div className="btn-social">
                                                <a href="">
                                                    <i className="fa-brands fa-google-plus-g"></i>
                                                </a>
                                            </div>
                                            <div className="btn-social">
                                                <a href="">
                                                    <i className="fa-brands fa-pinterest-p"></i>
                                                </a>
                                            </div>
                                            <div className="btn-social">
                                                <a href="">
                                                    <i className="fa-brands fa-linkedin-in"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail-content">
                        <div className="row">
                            <div className="col-lg-9 col-12">
                                <div className="product-detail-footer">
                                    <div className="tab-content">
                                        <h2 className="title">Thông tin sản phẩm</h2>
                                        <div className="row">
                                            <div className="col-12">
                                                <div dangerouslySetInnerHTML={{ __html: productDetail.product_info}} />
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="col-lg-3 col-12">
                                <div className="product-detail-footer">
                                    <h2 className="title">Top sản phẩm nổi bật</h2>
                                    {/* <ListProducts dataset={productHot} swiper={false}  /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="topic">
                        <div className="topic-name">
                            <h3>Sản phẩm liên quan</h3>
                            <ListItems dataset={productRelated} role={"product"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail




// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import ListItems from "../components/ListItems";

// const ProductDetail = () => {
//     const { product_id } = useParams();
//     const [productDetail, setProductDetail] = useState(null); // Sử dụng null thay vì [] để kiểm tra khi dữ liệu chưa có
//     const [productRelated, setProductRelated] = useState([]);
//     const [loading, setLoading] = useState(true);  // Quản lý trạng thái loading
//     const [error, setError] = useState(null); // Quản lý trạng thái lỗi

//     // Hàm gọi API chung cho cả productDetail và productRelated
//     const fetchProductData = async () => {
//         try {
//             const [detailResponse, relatedResponse] = await Promise.all([
//                 axios.get(`http://localhost:3000/products/detail/${product_id}`),
//                 axios.get(`http://localhost:3000/products/related/${product_id}`)
//             ]);
//             setProductDetail(detailResponse.data);
//             setProductRelated(relatedResponse.data);
//         } catch (err) {
//             console.error("Lỗi khi gọi API:", err);
//             setError("Có lỗi xảy ra khi tải dữ liệu.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sử dụng useEffect để gọi API khi product_id thay đổi
//     useEffect(() => {
//         fetchProductData();
//     }, [product_id]);

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('vi-VN').format(price);
//     };

//     if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
//     if (error) return <div>{error}</div>; // Hiển thị lỗi nếu có

//     return (
//         <div className="product-detail">
//             <div className="container">
//                 <div className="col-12">
//                     <div className="product-detail-head">
//                         <div className="row">
//                             <div className="col-lg-5 col-sm-6 col-12">
//                                 <div className="product-image-detail">
//                                     <div className="inner-image">
//                                         <img 
//                                             className="img-fluid" 
//                                             src={productDetail?.product_image_url} 
//                                             alt={productDetail?.product_name || "Sản phẩm"} 
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-7 col-sm-6 col-12">
//                                 <div className="box-product-info-detail">
//                                     <h1 className="product-title-detail">{productDetail?.product_name || "Tên sản phẩm"}</h1>
//                                     <div className="product-rating">
//                                         {[...Array(5)].map((_, i) => (
//                                             <i key={i} className="fa-solid fa-star"></i>
//                                         ))}
//                                     </div>
//                                     <div className="product-rating-action row">
//                                         <div className="col-6">
//                                             <label>Danh mục:&nbsp;&nbsp;</label>
//                                             <span>{productDetail?.category_name}</span>
//                                         </div>
//                                         <div className="col-6"> 
//                                             <label>Thương hiệu:&nbsp;&nbsp;</label>
//                                             <span>{productDetail?.brand_name}</span>
//                                         </div>
//                                         <div className="col-6"> 
//                                             <label>Mã sản phẩm:&nbsp;&nbsp;</label>
//                                             <span>{productDetail?.product_id}</span>
//                                         </div>
//                                         <div className="col-6"> 
//                                             <label>Tình trạng:&nbsp;&nbsp;</label>
//                                             <span>{productDetail?.stock > 0 ? "Còn hàng" : "Hết hàng" }</span>
//                                         </div>
//                                     </div>
//                                     <div className="price">
//                                         <span className="price-amount">
//                                             <span>{formatPrice(productDetail?.price)}</span>
//                                             <span className="currency-symbol">VND</span>
//                                         </span>
//                                         {productDetail?.old_price && 
//                                             <span className="price-amount old-price">
//                                                 <span>{formatPrice(productDetail.old_price)}</span>
//                                                 <span className="currency-symbol">VND</span>
//                                             </span>
//                                         }
//                                     </div>
//                                     <div className="box-product-action">
//                                         <div className="product-quantity">
//                                             <span className="btn-quantity quantity-subtract">
//                                                 <i className="fa-solid fa-minus"></i>
//                                             </span>
//                                             <input value={1} className="text-center number-input" type="text" maxLength="3" inputMode="decimal"/>
//                                             <span className="btn-quantity quantity-add">
//                                                 <i className="fa-solid fa-plus"></i>
//                                             </span>
//                                         </div>
//                                         <div className="product-action-detail">
//                                             <div className="btn-cart-buy">
//                                                 <a href="" className="add-to-cart">Thêm vào giỏ hàng</a>
//                                                 <a href="" className="add-to-cart add-to-card-buy">Thanh toán ngay</a>
//                                             </div>
//                                             <a className="btn-product-action">
//                                                 <i className="fa-solid fa-heart"></i>
//                                             </a>
//                                         </div>
//                                     </div>
//                                     <div className="product-description-detail">
//                                         <div className="title">Mô tả</div>
//                                         <div className="content">
//                                             <div dangerouslySetInnerHTML={{ __html: productDetail?.product_description }} />
//                                         </div>
//                                     </div>
//                                     <div className="social-share">
//                                         <span className="title">Chia sẻ:</span>   
//                                         <div className="list-social">
//                                             <div className="btn-social">
//                                                 <a href="">
//                                                     <i className="fa-brands fa-facebook-f"></i>
//                                                 </a>
//                                             </div>
//                                             <div className="btn-social">
//                                                 <a href="">
//                                                     <i className="fa-brands fa-twitter"></i>
//                                                 </a>
//                                             </div>
//                                             <div className="btn-social">
//                                                 <a href="">
//                                                     <i className="fa-brands fa-google-plus-g"></i>
//                                                 </a>
//                                             </div>
//                                             <div className="btn-social">
//                                                 <a href="">
//                                                     <i className="fa-brands fa-pinterest-p"></i>
//                                                 </a>
//                                             </div>
//                                             <div className="btn-social">
//                                                 <a href="">
//                                                     <i className="fa-brands fa-linkedin-in"></i>
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="product-detail-content">
//                         <div className="row">
//                             <div className="col-lg-9 col-12">
//                                 <div className="product-detail-footer">
//                                     <div className="tab-content">
//                                         <h2 className="title">Thông tin sản phẩm</h2>
//                                         <div className="row">
//                                             <div className="col-12">
//                                                 <div dangerouslySetInnerHTML={{ __html: productDetail?.product_info}} />
//                                             </div>
//                                         </div>
//                                     </div> 
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-12">
//                                 <div className="product-detail-footer">
//                                     <h2 className="title">Top sản phẩm nổi bật</h2>
//                                     {/* <ListProducts dataset={productHot} swiper={false}  /> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="topic">
//                         <div className="topic-name">
//                             <h3>Sản phẩm liên quan</h3>
//                             <ListItems dataset={productRelated} role={"product"}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail;
