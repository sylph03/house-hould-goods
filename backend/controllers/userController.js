const userModel = require('../models/userModel');

const insertUser = async (req, res) => {
    const dataUser = req.body;

    try {
        // Kiểm tra email hoặc số điện thoại đã tồn tại
        const [existingEmail, existingPhone] = await Promise.all([
            userModel.getUserByEmail(dataUser.email),
            userModel.getUserByPhone(dataUser.phone_number),
        ]);

        // Trả về lỗi nếu email hoặc số điện thoại đã tồn tại
        if (existingEmail) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        if (existingPhone) {
            return res.status(400).json({ message: "Số điện thoại đã tồn tại!" });
        }

        // Thêm người dùng mới
        const newUser = await userModel.insertUser(dataUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: 'Đăng ký thất bại!' });
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra người dùng tồn tại hay không
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Email của bạn hoặc Mật khẩu không đúng, vui lòng thử lại" });
        }

        // Kiểm tra mật khẩu
        if (user.password !== password) {
            return res.status(400).json({ message: "Email của bạn hoặc Mật khẩu không đúng, vui lòng thử lại" });
        }

        // Trả về thông tin người dùng khi đăng nhập thành công
        res.status(200).json({
            message: "Đăng nhập thành công!",
            user: {
                user_id: user.user_id,
                email: user.email,
                full_name: user.full_name,
                gender: user.gender,
                date_of_birth: user.date_of_birth,
                phone_number: user.phone_number,
                address: user.address,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Lỗi khi đăng nhập!" });
    }
};

module.exports = {
    insertUser,
    loginUser
};
