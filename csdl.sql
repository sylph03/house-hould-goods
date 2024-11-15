use householdgoods;
CREATE DATABASE householdgoods;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    password CHAR(60) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    gender ENUM('male', 'female', 'other') DEFAULT 'other',
    date_of_birth DATE,
    phone_number VARCHAR(20) UNIQUE,
    address TEXT,
    avatar VARCHAR(255) DEFAULT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (email)
);

CREATE TABLE brands (
    brand_id INT AUTO_INCREMENT PRIMARY KEY,       
    brand_name VARCHAR(100) NOT NULL                      
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,      
    category_name VARCHAR(50) NOT NULL,                 
    parent_category_id INT DEFAULT NULL,                -- Khóa ngoại tham chiếu đến category_id (nếu có phân cấp)
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id), -- Liên kết khóa ngoại với chính bảng categories
	INDEX (category_name),
    INDEX (parent_category_id)
);


CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_image_url VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2) DEFAULT NULL, 
    product_status ENUM('new', 'hot', 'sale', 'out_of_stock', 'regular') DEFAULT 'regular',
    stock INT UNSIGNED DEFAULT 0,
    product_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    brand_id INT,     
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    INDEX (brand_id),
    INDEX (price)
);

CREATE TABLE product_categories (
    product_id INT,
    category_id INT,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE product_detail (
    product_detail_id INT AUTO_INCREMENT PRIMARY KEY, 
    product_id INT,  
    product_description TEXT,
    product_info LONGTEXT,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);


CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,              
    user_id INT,                                       
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,      
    order_status ENUM('pending', 'shipped', 'delivered', 'canceled') DEFAULT 'pending', 
    total_amount DECIMAL(10, 2),                           
    shipping_address VARCHAR(255),                        
    order_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       
    order_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX (user_id),
    INDEX (order_date),
    INDEX (order_status)
);


CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,         -- Khóa chính, mã chi tiết đơn hàng
    order_id INT,                                           -- Khóa ngoại đến bảng orders
    product_id INT,                                         -- Khóa ngoại đến bảng sản phẩm
    quantity INT NOT NULL,                                  -- Số lượng sản phẩm trong đơn
    price DECIMAL(10, 2) NOT NULL,                          -- Giá sản phẩm tại thời điểm đặt hàng (có thể giảm giá tại thời điểm đó)
    total DECIMAL(10, 2) AS (quantity * price) VIRTUAL,      -- Tổng giá trị của mục hàng (số lượng * giá)
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE, -- Liên kết với đơn hàng
    FOREIGN KEY (product_id) REFERENCES products(product_id) -- Liên kết với sản phẩm
);

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,             -- Khóa chính, mã đánh giá
    product_id INT NOT NULL,                              -- Khóa ngoại đến bảng products
    user_id INT NOT NULL,                             -- Khóa ngoại đến bảng users
    rating INT CHECK (rating BETWEEN 0 AND 5),            -- Xếp hạng từ 1 đến 5
    review_text TEXT,                                     -- Nội dung đánh giá
    review_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- Ngày tạo đánh giá
    review_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Ngày cập nhật
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE, -- Liên kết với sản phẩm
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE, -- Liên kết với khách hàng
	INDEX (rating),
    INDEX (product_id),
    INDEX (user_id)
);

CREATE TABLE discounts (
    discount_id INT AUTO_INCREMENT PRIMARY KEY,             -- Khóa chính, mã khuyến mãi
    product_id INT NOT NULL,                                -- Khóa ngoại đến bảng products
    discount_rate DECIMAL(5, 2) NOT NULL,                   -- Tỉ lệ giảm giá (%)
    start_date TIMESTAMP NOT NULL,                          -- Ngày bắt đầu khuyến mãi
    end_date TIMESTAMP NOT NULL,                            -- Ngày kết thúc khuyến mãi
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE -- Liên kết với bảng products
);

CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,     -- Khóa chính, mã yêu thích
    user_id INT NOT NULL,                           -- Khóa ngoại đến bảng users
    product_id INT NOT NULL,                        -- Khóa ngoại đến bảng products
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,   -- Nếu người dùng bị xóa, xóa danh sách yêu thích của họ
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE, -- Nếu sản phẩm bị xóa, xóa bản ghi tương ứng
	INDEX (user_id),
    INDEX (product_id)
);

CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,                      -- Mã người dùng
    product_id INT NOT NULL,                   -- Mã sản phẩm trong giỏ hàng
    cart_quantity INT UNSIGNED DEFAULT 1,           -- Số lượng sản phẩm
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,  -- Khóa ngoại tới bảng users
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE, -- Khóa ngoại tới bảng products
    INDEX (user_id),
    INDEX (product_id)
);


CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,          -- Khóa chính, mã thanh toán
    order_id INT NOT NULL,                              -- Khóa ngoại đến bảng orders
    amount DECIMAL(10, 2) NOT NULL,                    -- Số tiền đã thanh toán
    payment_method VARCHAR(50) NOT NULL,               -- Phương thức thanh toán (ví dụ: Credit Card, PayPal, etc.)
    payment_status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Pending', -- Trạng thái thanh toán (ví dụ: Completed, Pending, Failed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Ngày thực hiện giao dịch
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE, -- Liên kết với bảng orders
	INDEX (payment_status),
    INDEX (order_id)
);
