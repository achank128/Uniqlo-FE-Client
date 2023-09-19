import { createBrowserRouter } from 'react-router-dom';

import Home from '../views/pages/home/Home';
import Product from '../views/pages/product/Product';
import ProductList from '../views/pages/productList/ProductList';
import Cart from '../views/pages/cart/Cart';
import WishList from '../views/pages/wishList/WishList';
import Login from '../views/pages/login/Login';
import Register from '../views/pages/register/Register';
import Profile from '../views/pages/profile/Profile';
import Checkout from '../views/pages/checkout/Checkout';
import Error from '../views/pages/Error';
import Order from '../views/pages/order/Order';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/products',
    element: <ProductList />,
  },
  {
    path: '/product/:id',
    element: <Product />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/wishlist',
    element: <WishList />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/order',
    element: <Order />,
  },
]);

export default router;
