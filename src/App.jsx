import './app.scss';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Navbar from './views/layouts/navbar/Navbar';
import Footer from './views/layouts/footer/Footer';
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
import Order from './views/pages/order/Order';
import Details from './views/pages/profile/details/Details';
import Coupon from './views/pages/profile/coupon/Coupon';
import Address from './views/pages/profile/address/Address';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="products" element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<Details />} />
            <Route path="coupon" element={<Coupon />} />
            <Route path="address" element={<Address />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
