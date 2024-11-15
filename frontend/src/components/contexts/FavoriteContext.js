// FavoriteContext.js
import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "./AuthContext";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    // Hàm để lấy danh sách yêu thích
    const getFavorites = async () => {
        if (user) {
            try {
                const favoritesProduct = await axios.get(`http://localhost:3000/favorites/${user.user_id}`);
                setFavorites(favoritesProduct.data);
            } catch (error) {
                console.error("Error get favorites from API:", error);
            }
        } else {
            const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavorites(savedFavorites);
        }
    };

    const syncLocalFavoritesToDB = async () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (savedFavorites.length > 0) {
            try {
                await Promise.all(
                    savedFavorites.map(item =>
                        axios.post('http://localhost:3000/favorites', {
                            user_id: user.user_id,
                            product_id: item.product_id
                        })
                    )
                );
                localStorage.removeItem('favorites'); // Xóa dữ liệu sau khi đồng bộ
                getFavorites(); // Tải lại danh sách từ DB sau khi đồng bộ
            } catch (error) {
                console.error("Error syncing favorites to database:", error);
            }
        }
    };

    // Tải danh sách yêu thích khi component mount
    useEffect(() => {
        getFavorites();
        if (user) {
            syncLocalFavoritesToDB();
        }
    }, [user]);

    // Thêm sản phẩm vào danh sách yêu thích
    const addToFavorites = async (product_id) => {
        if (user) {
            try {
                await axios.post('http://localhost:3000/favorites', {user_id : user.user_id, product_id})
                getFavorites();
            } catch (error) {
                console.error(error.response ? error.response.data.message : error.message);
            }
        } else {
            if (!favorites.some(item => item.product_id === product_id)) {
                const newFavorites = [...favorites, { product_id }];
                setFavorites(newFavorites);
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
            }
        }
    };

    // Xóa sản phẩm khỏi danh sách yêu thích
    const removeFavorites = async (product_id) => {
        if (user) {
            try {
                await axios.delete(`http://localhost:3000/favorites/${user.user_id}/${product_id}`);
                getFavorites();
            } catch (error) {
                console.error(error.response ? error.response.data.message : error.message);
            }
        } else {
            const newFavorites = favorites.filter(item => item.product_id  !== product_id);
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            console.log(localStorage.getItem('favorites'));
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
