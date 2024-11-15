import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/Responsive.css'

import Layout from './components/layout/Layout';
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './components/contexts/AuthContext'; //Context để chia sẻ trạng thái đăng nhập giữa các component
import { FavoriteProvider  } from './components/contexts/FavoriteContext'; //Context để chia sẻ trạng thái sản phẩm yêu thích giữa các component

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoriteProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:product_id" element={<ProductDetail />} /> 
              <Route path="/account/login" element={<Login />} /> 
              <Route path="/account/signup" element={<Signup />} /> 
            </Routes>
          </Layout>
        </FavoriteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
