import './app.scss';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './views/pages/home/Home';
import Product from './views/pages/product/Product';
import ProductList from './views/pages/productList/ProductList';
import Cart from './views/pages/cart/Cart';
import WishList from './views/pages/wishList/WishList';
import Login from './views/pages/login/Login';
import Register from './views/pages/register/Register';
import Profile from './views/pages/profile/Profile';
import Checkout from './views/pages/checkout/Checkout';
import Error from './views/pages/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product-list/:category" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
