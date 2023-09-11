import React, { useState } from 'react';
import './cartItem.scss';
import { Link } from 'react-router-dom';
import { Add, Close, KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { cartAction, removeCartItem, updateQuantity } from '../../../../redux/slices/cartSlice';
import { useTranslation } from 'react-i18next';
const formater = Intl.NumberFormat('de-DE');

const CartItem = ({ item }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [quantityOn, setQuantityOn] = useState(false);

  const handleRemove = () => {
    dispatch(removeCartItem(item.id)).then(() => {
      dispatch(cartAction.updateTotal());
    });
  };

  const handleUpdateQuantity = (quantity) => {
    let body = {
      id: item.id,
      quantity,
    };
    dispatch(updateQuantity(body)).then(() => {
      dispatch(cartAction.updateTotal());
    });
  };

  return (
    <div id="item-content">
      <button className="remove-item" onClick={handleRemove}>
        <Close />
      </button>
      <Link to={`/product/${item.product.id}`}>
        <div className="img">
          <img src={item.product?.productImages[0]?.imageUrl} alt="" />
        </div>
      </Link>
      <div className="info">
        <div className="name">
          {i18n.language === 'en'
            ? item.product.nameEn
            : i18n.language === 'vi'
            ? item.product.nameVi
            : item.product.name}
        </div>
        <p className="id">
          {t('common_product_id')}: {item.product.id}
        </p>
        <p className="color">
          {t('common_color')}:{' '}
          {i18n.language === 'en'
            ? item.productDetail.color?.nameEn
            : i18n.language === 'vi'
            ? item.productDetail.color?.nameVi
            : item.productDetail.color?.name}
        </p>
        <p className="size">
          {t('common_size')}:{' '}
          {i18n.language === 'en'
            ? item.productDetail.size?.nameEn
            : i18n.language === 'vi'
            ? item.productDetail.size?.nameVi
            : item.productDetail.size?.name}
        </p>
        {item.product.isSale ? (
          <>
            <p className="price" style={{ textDecorationLine: 'line-through' }}>
              {formater.format(item.product.productPrice?.price)} VND
            </p>
            <p className="promo-price">
              {formater.format(item.product.productPrice?.promoPrice)} VND
            </p>
          </>
        ) : (
          <p className="price">{formater.format(item.product.productPrice?.price)} VND</p>
        )}
        <div className="quanlity-subtotal">
          <div className="quanlity">
            <div className="quanlity-name">{t('common_quantity')}</div>
            <div className="quality-select" onClick={() => setQuantityOn(!quantityOn)}>
              <span>{item.quantity}</span>
              <span className={quantityOn ? 'arrow-up arrow-down' : 'arrow-down'}>
                <KeyboardArrowDown className="arrow-down-icon" />
              </span>
            </div>
            <button
              className="inc-quanlity"
              onClick={() => {
                handleUpdateQuantity(item.quantity + 1);
              }}
            >
              <Add className="add-icon" />
            </button>
            <ul className={quantityOn ? 'quanlity-list active' : 'quanlity-list'}>
              <li
                onClick={() => {
                  handleUpdateQuantity(1);
                  setQuantityOn(!quantityOn);
                }}
              >
                1
              </li>
              <li
                onClick={() => {
                  handleUpdateQuantity(2);
                  setQuantityOn(!quantityOn);
                }}
              >
                2
              </li>
              <li
                onClick={() => {
                  handleUpdateQuantity(3);
                  setQuantityOn(!quantityOn);
                }}
              >
                3
              </li>
            </ul>
          </div>
          <div className="subtotal">
            <div className="label">{t('common_subtotal')}:</div>
            {item.product.isSale ? (
              <div className="total">
                {formater.format(item.product.productPrice?.promoPrice * item.quantity)} VND
              </div>
            ) : (
              <div className="total">
                {formater.format(item.product.productPrice?.price * item.quantity)} VND
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
