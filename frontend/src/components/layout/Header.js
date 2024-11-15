import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FavoriteContext } from "../contexts/FavoriteContext";


const Header = () => {

    const { user, logout } = useContext(AuthContext);
    const { favorites } = useContext(FavoriteContext);

    return (
        <header className="header py-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-2 col-12">
                        <div className="logo">
                            <a href="">
                                <img className="img-fluid w-100" src="/images/logo-z.png"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="header-search">
                            <form className="position-relative">
                                <div className="input-group">
                                    <input className="form-control" name="keyword" placeholder="Từ khóa tìm kiếm" type="text"/>
                                    <button className="btn btn-submit">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 col-12">
                        <div className="header-action account-header">
                            { user ? 
                                <a href="" className="header-avatar btn-action-header">
                                    <img src={user.avatar? user.avatar : "/images/avatar.jpg"} with="22" height="22" />
                                    <span className="ms-2">{user.full_name}</span>
                                </a>
                                :
                                <a className="btn-action-header" href="/account/login">
                                    <i className="fa-solid fa-user pe-3"></i>
                                    <span>Tài khoản</span>
                                </a>
                            }
                            { user &&
                            <ul>
                                <li className="li-account">
                                    <a href="">
                                        <i className="fa-regular fa-user me-3"></i>
                                        Tài Khoản Của Tôi
                                    </a>
                                </li>
                                <li className="li-account">
                                    <a href="">
                                        <i className="fa-regular fa-clipboard me-3"></i>
                                        Đơn Mua
                                    </a>
                                </li>
                                <li className="li-account">
                                    <a href="/" onClick={logout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
                                        Đăng Xuất
                                    </a>
                                </li>
                            </ul>
                            }
                        </div>
                        <div className="header-action float-end">
                            <a className="btn-action-header" href="">
                                <i className="fa-solid fa-heart pe-3"></i>
                                <span>Yêu thích</span>
                                <span className="items-number">{favorites.length}</span>
                            </a>
                        </div>
                        <div className="header-action float-end">
                            <a className="btn-action-header" href="">
                                <i className="fa-solid fa-bag-shopping pe-3"></i>
                                <span>Giỏ hàng</span>
                                <span className="items-number">0</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header