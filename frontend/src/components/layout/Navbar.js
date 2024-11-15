import axios from "axios";
import React, { useState, useEffect } from "react";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const [categories, setCategories] = useState([]);

    const toggleMenu = (event) => {
        event.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };

    const openSidebar = (event) => {
        event.preventDefault();
        setIsOpenSideBar(!isOpenSideBar)
    }

    const closeSidebar = (event) => {
        event.preventDefault();
        setIsOpenSideBar(false);
    }

    const buildCategoryTree = (categories) => {
        const map = {};
        const tree = [];
    
        categories.forEach(category => {
            map[category.category_id] = { ...category, children: [] };
        });
    
        categories.forEach(category => {
            if (category.parent_category_id === null) {
                tree.push(map[category.category_id]);
            } else {
                map[category.parent_category_id]?.children.push(map[category.category_id]);
            }
        });
    
        return tree;
    };
    
    
    useEffect(() => {
        axios.get(`http://localhost:3000/products/categories`)
            .then(response => {
                const tree = buildCategoryTree(response.data);
                setCategories(tree);
            })
            .catch(error => {
                console.log("Lỗi gọi api categories!", error);
            });
    }, []);
    
    
    const renderCategoryTree = (categories) => {
        return (
            <ul className="nav-menu-opt-list">
                {categories.map(category => (
                    <li className="parent" key={category.category_id}>
                        <a href="#">
                            {category.category_name}
                            {category.children.length > 0 && <i className="fa-solid fa-chevron-right"></i>}
                        </a>
                        {category.children.length > 0 && (
                            <div className="nav-menu-child">
                                <div className="row">
                                    {category.children.map(subCategory => (
                                        <div className="nav-item lv2 col-lg-4 col-md-4" key={subCategory.category_id}>
                                            <a href="#">{subCategory.category_name}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };    
    

    return (
        <div className="nav">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-12">
                        <div className="nav-menu">
                            <a href="#" className="nav-menu-title" onClick={toggleMenu}>
                                <i className="fa-solid fa-bars me-4"></i>
                                Danh mục
                            </a>
                            <div className={`nav-menu-opt ${isMenuOpen ? "open" : ""}`}>
                                {renderCategoryTree(categories)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-12">
                        <div className="nav-container">
                            <a href="" className="btn-nav-mobile" onClick={openSidebar}>
                                <i className="fa-solid fa-bars-staggered"></i>
                            </a>
                            <div className={`back-drop ${isOpenSideBar ? "open" : ""}`} onClick={closeSidebar}></div>
                            <div className={`nav-section ${isOpenSideBar ? "open" : ""}`}>
                                <div className="nav-top">
                                    <span className="nav-top-title">
                                        Menu
                                    </span>
                                    <a className="close-sidebar effect-rotate icon-close" href="" onClick={closeSidebar}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </a>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/" className="active">
                                            Trang chủ
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li className="position-relative">
                                        <a href="">
                                            Sản phẩm
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </a>
                                        
                                        {/* <ul className="nav-menu-list down">
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Nồi cơm điện
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Nồi chiên không dầu
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Máy làm sữa hạt
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Máy ép trái cây
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Máy xay sinh tố
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Lò vi sóng 
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Ấm siêu tốc
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className="nav-opt">
                                                    Bếp điện
                                                </a>
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        <a href="">
                                            Tin tức
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="">
                                            Khuyến mại
                                        </a>
                                    </li> */}
                                    <li>
                                        <a href="">
                                            Liên hệ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="nav-hotline">
                            <a href="">
                                <i className="fa-solid fa-phone-volume me-3"></i>
                                1900 6680 - 09011916
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar