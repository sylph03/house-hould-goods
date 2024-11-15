import React from "react";

const Footer = () => {
    return (
        // bg-color-1  fbfbfb
        <footer className="footer bg-color-1 py-5"> 
            <div className="pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="logo">
                                <a href="">
                                    <img className="img-fluid" src="/images/logo-z.png"/>
                                </a>
                            </div>
                            <div className="info-website my-5">
                                <h4 className="title-footer">Công ty TNHH đồ gia dụng</h4>
                                <p>
                                    <i className="me-2 fa-solid fa-phone"></i>
                                    1900 6680 / 0901191616
                                </p>
                                <p>
                                    <i className="me-2 fa-solid fa-location-dot"></i>
                                    Tầng 4, Tòa nhà số 97 - 99 Láng Hạ, Đống Đa, Hà Nội (Tòa nhà Petrowaco)
                                </p>
                                <p>
                                    <i className="me-2 fa-solid fa-envelope"></i>
                                    contact@sm4s.vn
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-4">
                                <h4 className="title-footer">Giới thiệu chung</h4>
                                <p>
                                    Ngợp giữa thị trường sữa với quá nhiều chủng loại và nhãn hàng, các mẹ không biết nên chọn loại sữa nào “hợp” với bé và “hợp” túi tiền? ...
                                </p>
                            </div>
                            <div className="social-section mb-4">
                                <h4 className="title-footer">Theo dõi chúng tôi</h4>
                                <ul className="list-inline d-flex mb-0">
                                    <li>
                                        <a href="">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa-brands fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa-brands fa-google"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa-brands fa-youtube"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-5 footer-menu-section mb-5">
                                <h4 className="title-footer">Liên kết</h4>
                                <ul>
                                    <li className="pb-3">
                                        <a href="">Về chúng tôi</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Tin khuyến mãi</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Kiến thức</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Tuyển dụng</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Bán buôn</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Liên hệ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-menu-section mb-5">
                                <h4 className="title-footer">
                                    Hướng dẫn mua hàng
                                </h4>
                                <ul>
                                    <li className="pb-3">
                                        <a href="">Cam kết bán hàng</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Hướng dẫn mua hàng</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Đặt hàng Online - Nhận cửa hàng</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Phương thức thanh toán</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Phương thức vận chuyển</a>
                                    </li>
                                    <li className="pb-3">
                                        <a href="">Điều khoản sử dụng</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer