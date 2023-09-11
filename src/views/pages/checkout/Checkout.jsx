import React, { useEffect, useState } from 'react';
import './checkout.scss';
import { Link, useNavigate } from 'react-router-dom';
import { KeyboardArrowDown, ConfirmationNumberOutlined, Edit, Check } from '@mui/icons-material';
//components
import Loading from '../../components/loading/Loading';
import { Grid, IconButton } from '@mui/material';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../redux/slices/authSlice';
import {
  amountSelector,
  cartSelector,
  clearCart,
  subTotalSelector,
} from '../../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import AddressForm from '../../components/addressForm/AddressForm';
import addressApi from '../../../api/apiAddress';
import orderApi from '../../../api/apiOrder';
import { useTranslation } from 'react-i18next';
import Confirm from '../../components/confirm/Confirm';

const formater = Intl.NumberFormat('de-DE');

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  const amount = useSelector(amountSelector);
  const subtotal = useSelector(subTotalSelector);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [shipmentSubmit, setShipmentSubmit] = useState(false);
  const [paymentSubmit, setPaymentSubmit] = useState(false);
  const [shippingFee, setShippingFee] = useState(30000);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(subtotal);
  const [coupon, setCoupon] = useState();
  const [address, setAddress] = useState();
  const [paymentType, setPaymentType] = useState('CASH');

  const { data: userAddress } = useQuery(['userAddress'], () => addressApi.getMyAddress());

  useEffect(() => {
    if (userAddress) {
      const addrs = userAddress.find((ad) => ad.isDefault);
      setAddress(addrs);
    }
  }, [userAddress]);

  useEffect(() => {
    setTotal(subtotal + shippingFee);
  }, [subtotal, shippingFee]);

  const handleSubmitShipment = () => {
    setShipmentSubmit(true);
  };
  const handleSubmitPayment = () => {
    setPaymentSubmit(true);
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      setOpenConfirm(false);
      const orderItems = cart.cartItems.map((item) => {
        return {
          productDetailId: item.productDetailId,
          quantity: item.quantity,
          price: item.product.isSale
            ? item.product.productPrice.promoPrice
            : item.product.productPrice.price,
        };
      });
      const body = {
        userId: user.id,
        note: '',
        couponId: coupon?.id,
        items: cart.cartItems.length,
        amount: amount,
        subtotal: subtotal,
        vatIncluded: subtotal * 0.1,
        discount: discount,
        shippingFee: shippingFee,
        total: total,
        status: 'OPEN',
        userAddressId: address.id,
        receivedDate: new Date(),
        shipmentPay: total,
        shipmentNote: '',
        paymentType: paymentType,
        paymentDate: new Date(),
        creditCardName: '',
        creditCardType: '',
        creditCardDate: '',
        creditCardNumber: '',
        creditCardNumberDisplay: '',
        paymentNote: '',
        orderItems: orderItems,
      };
      const res = await orderApi.createOrder(body);
      dispatch(clearCart(cart.id)).then(() => {
        toast.success(res.message);
        navigate('/profile/order');
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.Message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && (
        <div id="loading-overlay">
          <Loading />
        </div>
      )}
      <div id="checkout">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">{t('common_uniqlo')}</Link>
                </li>
                <li className="slash">/</li>
                <li>
                  <Link to="/cart">{t('cart_shopping_cart')}</Link>
                </li>
                <li className="slash">/</li>
                <li>{t('common_checkout')}</li>
              </ul>
            </div>
            <div className="checkout-title">
              <h2>{t('common_checkout')}</h2>
            </div>
            <Grid container spacing={6} className="checkout-content">
              <Grid item md={8} className="checkout-form">
                <div className="form-item">
                  <div className="heading">
                    <h2>1. {t('order_delivery_option')}</h2>
                  </div>

                  {address ? (
                    <div className="shipping-date">
                      <h4>{t('order_delivery_date')}</h4>
                      <p>
                        {t('order_shipping')}:{' '}
                        <span className="fee">
                          <b>{formater.format(shippingFee)} VND</b>
                        </span>
                      </p>
                      <p>{t('order_shipping_estimated_date')}: 13/09/2023</p>
                      <p>
                        {t('common_notice')}: {t('order_shipping_notice')}
                      </p>
                    </div>
                  ) : (
                    <div className="shipping-type">
                      <div className="radio-input">
                        <label className={'checked'}>
                          <input type="radio" />
                          <span className="checkmark"></span>
                          <span>{t('order_ship_to_address')}</span>
                        </label>
                        <p>
                          {t('order_shipping')}:{' '}
                          <span className="fee">
                            <b>{formater.format(shippingFee)} VND</b>
                          </span>
                        </p>
                        <p>
                          <b>{t('order_ship_notice')}</b>
                        </p>
                      </div>
                    </div>
                  )}

                  {address ? (
                    <div className="shipping-address">
                      <h4>{t('order_shipping_address')}</h4>
                      <div className="info">
                        <div className="name">{address.fullName}</div>
                        <p>
                          {address.addressDetail}, {address.ward?.fullName},{' '}
                          {address.district?.fullName}, {address.province?.fullName}
                        </p>
                        <p>{address.phone}</p>
                        {address.note && (
                          <p>
                            {t('common_note')}: {address.note}
                          </p>
                        )}
                      </div>
                      <IconButton aria-label="edit" className="btn-edit">
                        <Edit />
                      </IconButton>
                    </div>
                  ) : (
                    <AddressForm />
                  )}

                  {!shipmentSubmit && address && (
                    <button className="btn-continue" onClick={handleSubmitShipment}>
                      {t('order_continue_payment')}
                    </button>
                  )}
                </div>

                {shipmentSubmit ? (
                  paymentSubmit ? (
                    <div className="form-item">
                      <div className="heading">
                        <h2>2. {t('order_payment_option')}</h2>
                      </div>
                      <div className="payment-content">
                        <p>
                          <Check style={{ marginBottom: '-6px', marginRight: '6px' }} />
                          <b>{t('order_payment_cash')}</b>
                        </p>
                        <IconButton
                          aria-label="edit"
                          className="btn-edit"
                          onClick={() => setPaymentSubmit(false)}
                        >
                          <Edit />
                        </IconButton>
                      </div>
                    </div>
                  ) : (
                    <div className="form-item">
                      <div className="heading">
                        <h2>2. {t('order_payment_option')}</h2>
                        <p>{t('order_plese_select_payment_option')}</p>
                      </div>

                      <div className="payment-option">
                        <div className="radio-input">
                          <label>
                            <input
                              type="radio"
                              name="payment-option"
                              value="CASH"
                              checked={paymentType === 'CASH'}
                              onChange={(e) => setPaymentType(e.target.value)}
                            />
                            <span className="checkmark"></span>
                            <span>{t('order_payment_cash')}</span>
                          </label>
                        </div>
                        <div className="radio-input">
                          <label>
                            <input
                              type="radio"
                              name="payment-option"
                              value="CREDIT"
                              checked={paymentType === 'CREDIT'}
                              onChange={(e) => setPaymentType(e.target.value)}
                            />
                            <span className="checkmark"></span>
                            <span>{t('order_payment_credit')}</span>
                          </label>
                        </div>
                        <div className="radio-input">
                          <label>
                            <input
                              type="radio"
                              name="payment-option"
                              value="ATM"
                              checked={paymentType === 'ATM'}
                              onChange={(e) => setPaymentType(e.target.value)}
                            />
                            <span className="checkmark"></span>
                            <span>{t('order_payment_atm')}</span>
                          </label>
                        </div>
                      </div>

                      <div className="payment-content">
                        <p>{t('order_payment_cash_notice')}</p>
                      </div>

                      <button className="btn-continue" onClick={handleSubmitPayment}>
                        {t('common_continue')}
                      </button>
                    </div>
                  )
                ) : (
                  <div className="form-item disabled">
                    <div className="heading">
                      <h2>2. {t('order_payment_option')}</h2>
                    </div>
                  </div>
                )}

                {shipmentSubmit && paymentSubmit ? (
                  <div className="form-item">
                    <div className="heading">
                      <h2>3. {t('common_order_summary')}</h2>
                    </div>
                    <div className="order-summary">
                      <div className="item-subtotal">
                        <div>{t('common_items_subtotal')}</div>
                        <div className="total">{formater.format(subtotal)} VND</div>
                      </div>
                      <div className="shipping">
                        <div>{t('common_shipping_fee')}</div>
                        <div className="total">{formater.format(shippingFee)} VND</div>
                      </div>
                      <div className="subtotal">
                        <div>{t('common_subtotal')}</div>
                        <div className="total">{formater.format(subtotal)} VND</div>
                      </div>
                      <div className="vat">
                        <div>{t('common_vat_included')}</div>
                        <div className="total">{formater.format(subtotal * 0.1)} VND</div>
                      </div>
                      <div className="order-total">
                        <div>{t('common_order_total')}</div>
                        <div className="total">{formater.format(total)} VND</div>
                      </div>
                    </div>

                    <button className="btn-submit" onClick={() => setOpenConfirm(true)}>
                      {t('order_place')}
                    </button>
                    <p className="place-order-text">{t('order_place_notice')}</p>
                  </div>
                ) : (
                  <div className="form-item disabled">
                    <div className="heading">
                      <h2>3. {t('common_order_summary')}</h2>
                    </div>
                  </div>
                )}
              </Grid>

              <Grid item md={4} className="summary">
                <div className="summary-content">
                  <h3 className="title">
                    {t('common_order_summary')}| {amount} {t('common_items')}
                  </h3>
                  <div className="item-subtotal">
                    <div className="label">{t('common_items_subtotal')}</div>
                    <div className="total">{formater.format(subtotal)} VND</div>
                  </div>
                  <div className="shipping">
                    <div className="label">{t('common_shipping_fee')}</div>
                    <div className="total">{formater.format(shippingFee)} VND</div>
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
                    <div className="total">{formater.format(total)} VND</div>
                  </div>
                </div>
                <div className="summary-content">
                  <h3 className="title">
                    {t('order')} {amount} {t('common_items')}
                  </h3>
                  <div className="list-img-item">
                    {cart.cartItems.map((item) => (
                      <div className="item-img" key={item.id}>
                        <img src={item.product?.productImages[0]?.imageUrl} alt="" />
                        <p className="quantity-item">x{item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="coupon">
                  <span>
                    <ConfirmationNumberOutlined className="icon-coupon" /> {t('common_coupon')}
                  </span>
                  <span className="arrow-down">
                    <KeyboardArrowDown className="arrow-down-icon" />
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        <Confirm
          open={openConfirm}
          setOpen={setOpenConfirm}
          Content={() => <p>{t('order_place_confirm_content')}</p>}
          titleText={'order_place_confirm'}
          onConfirm={handleSubmitOrder}
        />
      </div>
    </>
  );
};

export default Checkout;
