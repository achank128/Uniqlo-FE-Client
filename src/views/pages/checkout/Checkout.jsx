import React, { useEffect, useState } from 'react';
import './checkout.scss';
import { Link, useNavigate } from 'react-router-dom';
import { KeyboardArrowDown, ConfirmationNumberOutlined, Edit, Check } from '@mui/icons-material';
//components
import Loading from '../../components/loading/Loading';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
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

const formater = Intl.NumberFormat('de-DE');

const Checkout = () => {
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
      navigate('/order');
    });
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
        <Dialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Confirm your order'}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
              Full Name: <b>{address.fullName}</b>
              <br></br>
              Phone: <b>{address.phone}</b>
              <br></br>
              Address:{' '}
              <b>
                {address.addressDetail}, {address.address}
              </b>
              <br></br>
              Order Items: <b>{amount}</b>
              <br></br>
              Order Total: <b>{formater.format(total)} VND</b>
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>Disagree</Button>
            <Button onClick={() => {}} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>
                  <Link to="/cart">Shopping Cart</Link>
                </li>
                <li className="slash">/</li>
                <li>Checkout</li>
              </ul>
            </div>
            <div className="checkout-title">
              <h2>CHECKOUT</h2>
            </div>
            <Grid container spacing={6} className="checkout-content">
              <Grid item md={8} className="checkout-form">
                <div className="form-item">
                  <div className="heading">
                    <h2>1. DELIVERY OPTION</h2>
                  </div>

                  {address ? (
                    <div className="shipping-date">
                      <h4>DELIVERY DATE</h4>
                      <p>
                        Shipping:{' '}
                        <span className="fee">
                          <b>50000 VND</b>
                        </span>
                      </p>
                      <p>Estimated delivery time: 13/09/2023</p>
                      <p>
                        Notice: please find the details of delivery information in the email send
                        after shipping containing alteration will take additional 2-4 days to
                        deliver.
                      </p>
                    </div>
                  ) : (
                    <div className="shipping-type">
                      <div className="radio-input">
                        <label className={' checked'}>
                          <input type="radio" />
                          <span className="checkmark"></span>
                          <span>Ship To Address</span>
                        </label>
                        <p>
                          Shipping:{' '}
                          <span className="fee">
                            <b>50000 VND</b>
                          </span>
                        </p>
                        <p>
                          <b>
                            Free shipping applies for home delivery orders above 1,500,000VND and
                            all in store pick up (Click & Collect). After you click Checkout, your
                            items will be reserved in cart for 30 minutes.
                          </b>
                        </p>
                      </div>
                    </div>
                  )}

                  {address ? (
                    <div className="shipping-address">
                      <h4>SHIPPING ADDRESS</h4>
                      <div className="info">
                        <div className="name">{address.fullName}</div>
                        <p>
                          {address.addressDetail}, {address.ward?.fullName},{' '}
                          {address.district?.fullName}, {address.province?.fullName}
                        </p>
                        <p>{address.phone}</p>
                        {address.note && <p>Note: {address.note}</p>}
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
                      CONTINUE TO PAYMENT
                    </button>
                  )}
                </div>

                {shipmentSubmit ? (
                  paymentSubmit ? (
                    <div className="form-item">
                      <div className="heading">
                        <h2>2. PAYMENT OPTION</h2>
                      </div>
                      <div className="payment-content">
                        <p>
                          <Check style={{ marginBottom: '-6px', marginRight: '6px' }} />
                          <b>CASH ON DELIVERY</b>
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
                        <h2>2. PAYMENT OPTION</h2>
                        <p>Please select your payment option</p>
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
                            <span>Card On Delivery</span>
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
                            <span>Credit/Debit Card</span>
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
                            <span>ATM Card</span>
                          </label>
                        </div>
                      </div>

                      <div className="payment-content">
                        <p>
                          Please make payment to carrier in cash when carrier deliveries your order.
                        </p>
                      </div>

                      <button className="btn-continue" onClick={handleSubmitPayment}>
                        CONTINUE
                      </button>
                    </div>
                  )
                ) : (
                  <div className="form-item disabled">
                    <div className="heading">
                      <h2>2. PAYMENT OPTION</h2>
                    </div>
                  </div>
                )}

                {shipmentSubmit && paymentSubmit ? (
                  <div className="form-item">
                    <div className="heading">
                      <h2>3. ORDER SUMMARY</h2>
                    </div>
                    <div className="order-summary">
                      <div className="item-subtotal">
                        <div>Item(s) subtotal</div>
                        <div className="total">{formater.format(subtotal)} VND</div>
                      </div>
                      <div className="shipping">
                        <div>Shipping Fee</div>
                        <div className="total">{formater.format(shippingFee)} VND</div>
                      </div>
                      <div className="subtotal">
                        <div>SUBTOTAL</div>
                        <div className="total">{formater.format(subtotal)} VND</div>
                      </div>
                      <div className="vat">
                        <div>VAT included</div>
                        <div className="total">{formater.format(subtotal * 0.1)} VND</div>
                      </div>
                      <div className="order-total">
                        <div>ORDER TOTAL</div>
                        <div className="total">{formater.format(total)} VND</div>
                      </div>
                    </div>

                    <button className="btn-submit" onClick={handleSubmitOrder}>
                      PLACE ORDER
                    </button>
                    <p className="place-order-text">Press Place Order to complete your purchase.</p>
                  </div>
                ) : (
                  <div className="form-item disabled">
                    <div className="heading">
                      <h2>3. ORDER SUMMARY</h2>
                    </div>
                  </div>
                )}
              </Grid>

              <Grid item md={4} className="summary">
                <div className="summary-content">
                  <h3 className="title">ORDER SUMMARY| {amount} ITEM(S)</h3>
                  <div className="item-subtotal">
                    <div className="label">Item(s) subtotal</div>
                    <div className="total">{formater.format(subtotal)} VND</div>
                  </div>
                  <div className="shipping">
                    <div className="label">Shipping Fee</div>
                    <div className="total">{formater.format(shippingFee)} VND</div>
                  </div>
                  <div className="subtotal">
                    <div className="label">SUBTOTAL</div>
                    <div className="total">{formater.format(subtotal)} VND</div>
                  </div>
                  <div className="vat">
                    <div className="label">VAT included</div>
                    <div className="total">{formater.format(subtotal * 0.1)} VND</div>
                  </div>
                  <div className="order-total">
                    <div className="label">ORDER TOTAL</div>
                    <div className="total">{formater.format(total)} VND</div>
                  </div>
                </div>
                <div className="summary-content">
                  <h3 className="title">ORDER {amount} ITEM (S)</h3>
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
                    <ConfirmationNumberOutlined className="icon-coupon" /> Coupon
                  </span>
                  <span className="arrow-down">
                    <KeyboardArrowDown className="arrow-down-icon" />
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
