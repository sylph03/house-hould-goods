import React, { useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../components/contexts/AuthContext";

const Login = () => {

    // trạng thái ẩn/hiển thị passowrd
    const [showPassword, setShowPassword] = useState(false);

    // trạng thái thông tin đăng nhập
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // trạng thái lỗi
    const [errors, setErrors] = useState("");

    // chia sẻ trạng thái đăng nhập
    const { login } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrors("");

        try {
            const response = await axios.post('http://localhost:3000/users/login', {email, password});
            
            // lưu thông tin người dùng vào localStorage qua Login của AuthContext
            login(response.data.user)
            
            alert("Đăng nhập thành công!");
            // Redirect hoặc xử lý tiếp tùy nhu cầu
            // Ví dụ: window.location.href = '/dashboard';

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                setErrors(errorMessage);
            }
        }

    }

    return (
        <div className="login auth">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-12">
                        <div className="box-auth">
                            <ul className="auth-block">
                                <li className="active">
                                    <a href="#">Đăng nhập</a>
                                </li>
                                <li className="">
                                    <a href="/account/signup">Đăng ký</a>
                                </li>
                            </ul>
                            <h1 className="auth-title">Đăng nhập</h1>
                            <form onSubmit={handleLogin} id="form-login" className="form-auth">
                                <div className="form-signup error" style={{color : "red", display: "block"} }>{errors}</div>
                                <div className="form-signup">
                                    <div className="form-group">
                                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" required/>
                                    </div>
                                    <div className="form-group">
                                        <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="form-control" placeholder="Mật khẩu" required/>
                                        {showPassword ? 
                                            <i className="fa-solid fa-eye" onClick={togglePasswordVisibility}></i> : <i className="fa-solid fa-eye-slash" onClick={togglePasswordVisibility}></i>
                                        }
                                    </div>
                                    <div className="auth-action">
                                        <input className="auth-button" type="submit" value="Đăng nhập"/>
                                        <span className="quenmk">Quên mật khẩu?</span>
                                    </div>
                                </div>
                            </form>
                            <div className="box-social-login">
                                <p>Hoặc đăng nhập bằng</p>
                                <a href="" className="social-login social-login--facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                    Facebook
                                </a>
                                <a href="" className="social-login social-login--google">
                                    <i className="fa-brands fa-google-plus-g"></i>
                                    Google
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login