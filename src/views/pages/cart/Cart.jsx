import React, { useEffect } from 'react';
import './cart.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InfoOutlined, KeyboardArrowDown, ConfirmationNumberOutlined } from '@mui/icons-material';
//components
import CartItem from './cartItem/CartItem';
import { amountSelector, cartSelector, subTotalSelector } from '../../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/slices/authSlice';
const formater = Intl.NumberFormat('de-DE');

const Cart = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  const amount = useSelector(amountSelector);
  const subtotal = useSelector(subTotalSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id="cart">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">{t('common_uniqlo')}</Link>
                </li>
                <li className="slash">/</li>
                <li>{t('cart_shopping_cart')}</li>
              </ul>
            </div>
            <div className="cart-title">
              <h2>{t('cart_shopping_cart')}</h2>
            </div>
            {cart?.cartItems?.length > 0 ? (
              <div className="cart-content">
                <div className="items">
                  {cart.cartItems.map((item) => (
                    <CartItem item={item} key={item.id} />
                  ))}
                </div>
                <div className="summary">
                  <div className="summary-content">
                    <h3 className="title">
                      {t('common_order_summary')}| {amount} {t('common_items')}
                    </h3>
                    <div className="item-subtotal">
                      <div className="label">{t('common_items_subtotal')}</div>
                      <div className="total">{formater.format(subtotal)} VND</div>
                    </div>
                    <div className="subtotal">
                      <div className="label">{t('common_subtotal')}</div>
                      <div className="total">{formater.format(subtotal)} VND</div>
                    </div>
                    <div className="vat">
                      <div className="label">{t('common_vat_included')}</div>
                      <div className="total">{formater.format(subtotal * 0.1)} VND</div>
                    </div>
                    <div className="order-total">
                      <div className="label">{t('common_order_total')}</div>
                      <div className="total">{formater.format(subtotal)} VND</div>
                    </div>
                  </div>
                  <div className="coupon">
                    <span>
                      <ConfirmationNumberOutlined className="icon-coupon" /> Coupon
                    </span>
                    <span className="arrow-down">
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <div className="text">
                    <p>{t('cart_checkout_desc')}</p>
                    <span>
                      <InfoOutlined className="icon" />
                    </span>
                  </div>

                  <button
                    className="btn-checkout"
                    onClick={() => {
                      if (user) navigate('/checkout');
                      else navigate('/login');
                    }}
                  >
                    {t('common_checkout')}
                  </button>
                  <Link to="/products">
                    <button className="btn-continue-shopping">
                      {t('common_continue_shopping')}
                    </button>
                  </Link>
                  <div className="info-shipping">{t('cart_info_shipping')}</div>
                </div>
              </div>
            ) : (
              <div className="no-item">
                <p>{t('cart_empty')}</p>
                <Link to="/products">
                  <button className="no-item-shopping">{t('common_continue_shopping')}</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
