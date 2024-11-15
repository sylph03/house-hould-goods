const favoritesModel = require('../models/favoritesModel');

// Thêm sản phẩm vào mục yêu thích
const insertFavorites = async (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user_id hoặc product_id' });
    }

    try {
        // Kiểm tra nếu sản phẩm đã tồn tại trong mục yêu thích của người dùng
        const existingFavorite = await favoritesModel.checkFavoriteExists(user_id, product_id);
        if (existingFavorite) {
            return res.status(400).json({ message: 'Sản phẩm đã có trong mục yêu thích' });
        }

        const newFavorites = await favoritesModel.insertFavorites(user_id, product_id);
        res.status(201).json(newFavorites);
    } catch (error) {
        console.error("Error inserting favorites:", error);
        res.status(500).json({ message: "Thêm sản phẩm yêu thích thất bại" });
    }
};

// Xóa sản phẩm khỏi mục yêu thích
const deleteFavorites = async (req, res) => {
    const { user_id, product_id } = req.params; // Sử dụng params thay vì body

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user_id hoặc product_id' });
    }

    try {
        const result = await favoritesModel.deleteFavorites(user_id, product_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong mục yêu thích của người dùng' });
        }
        res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi mục yêu thích' });
    } catch (error) {
        console.error("Error deleting favorites:", error);
        res.status(500).json({ message: "Xóa sản phẩm khỏi mục yêu thích thất bại" });
    }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
const getFavorites = async (req, res) => {
    const { user_id } = req.params; // Sử dụng params thay vì body

    if (!user_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user_id' });
    }

    try {
        const favoritesList = await favoritesModel.getFavorites(user_id);
        if (favoritesList.length === 0) {
            return res.status(404).json({ message: 'Không có sản phẩm yêu thích nào' });
        }
        res.status(200).json(favoritesList);
    } catch (error) {
        console.error("Error getting favorites:", error);
        res.status(500).json({ message: "Lấy danh sách sản phẩm yêu thích thất bại" });
    }
};

module.exports = {
    insertFavorites,
    deleteFavorites,
    getFavorites
};
