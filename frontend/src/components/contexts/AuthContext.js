import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();  // Sử dụng thông tin đăng nhập chia sẻ AuthProvider

export const AuthProvider = ({ children }) => {     
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi ứng dụng tải lần đầu
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
    }, []);

    const login = (userData) => {
        // Cập nhật localStorage và state
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        // Xóa dữ liệu khi người dùng đăng xuất
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
