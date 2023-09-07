import React, { useState } from 'react';
import './cartItem.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../../../hooks/useGlobalContext';
import { Add, Close, KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { cartAction, removeCartItem, updateQuantity } from '../../../../redux/slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { formater } = useGlobalContext();
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
        <div className="name">{item.product.name}</div>
        <p className="id">Product ID: {item.product.id}</p>
        <p className="color">Color: {item.productDetail.color?.name}</p>
        <p className="size">Size: {item.productDetail.size?.name}</p>
        <p className="sale">Sale</p>
        <p className="price">{formater.format(item.product.productPrice?.price)} VND</p>
        <div className="quanlity-subtotal">
          <div className="quanlity">
            <div className="quanlity-name">QUANTITY</div>
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
              <li
                onClick={() => {
                  handleUpdateQuantity(4);
                  setQuantityOn(!quantityOn);
                }}
              >
                4
              </li>
              <li
                onClick={() => {
                  handleUpdateQuantity(5);
                  setQuantityOn(!quantityOn);
                }}
              >
                5
              </li>
            </ul>
          </div>
          <div className="subtotal">
            <div className="label">SUBTOTAL:</div>
            <div className="total">
              {formater.format(item.product.productPrice?.price * item.quantity)} VND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
