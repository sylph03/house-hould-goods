import React, { useState, useEffect } from "react";
import axios from 'axios';


const Signup = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (verifyPassword && verifyPassword === password) {
            setErrors("");
        }
    }, [verifyPassword, password]);

    const validateVerifyPassword = () => {
        if (verifyPassword.trim() !== password.trim()) {
            setErrors("Xác nhận mật khẩu không khớp!");
            return false;
        } else {
            setErrors("");
            return true;
        }
    };

    const handleSignup = async (e) => {

        e.preventDefault();
        
        if (!validateVerifyPassword()) {
            return;
        }
 
        setErrors("");

        const dataUser = {
            password: password.trim(),
            email: email.trim(),
            full_name: fullName.trim(),
            phone_number: phone.trim(),
            role: "user",
        }

        try {
            const response = await axios.post('http://localhost:3000/users/signup', dataUser);
            alert("Đăng ký thành công!");
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                setErrors(errorMessage);
            }
        }
    }

    return (
        <div className="Signup auth">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-12">
                        <div className="box-auth">
                            <ul className="auth-block">
                                <li className="">
                                    <a href="/account/login">Đăng nhập</a>
                                </li>
                                <li className="active">
                                    <a href="#">Đăng ký</a>
                                </li>
                            </ul>
                            <h1 className="auth-title">Đăng ký</h1>
                            <form onSubmit={handleSignup} id="form-signup" className="form-auth">
                                {errors && <div className="form-signup error" style={{color : "red", display: "block"}}> {errors} </div>}
                                <div className="form-signup">
                                    <div className="form-group">
                                        <input value={fullName} onChange={e => {setFullName(e.target.value)}} type="text" className="form-control" placeholder="Họ và tên" pattern="^[A-Za-zÀ-ÿ\s]+$" title="Tên chỉ bao gồm các chữ cái và khoảng trắng" required/>
                                    </div>
                                    <div className="form-group">
                                        <input value={email} onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" required/>
                                    </div>
                                    <div className="form-group">
                                        <input value={phone} onChange={e => {setPhone(e.target.value)}} type="text" className="form-control" placeholder="Số điện thoại" pattern="\d+" required/>
                                    </div>
                                    <div className="form-group">
                                        <input value={password} onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" placeholder="Mật khẩu" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Phải chứa ít nhất một số và một chữ cái viết hoa và viết thường, và ít nhất 6 ký tự trở lên" required/>
                                    </div>
                                    <div className="form-group">
                                        <input value={verifyPassword} onChange={e => {setVerifyPassword(e.target.value)}} type="password" className="form-control" placeholder="Xác nhận Mật khẩu" required/>
                                    </div>
                                    <div className="auth-action">
                                        <input className="auth-button" type="submit" value="Đăng ký"/>
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

export default Signup