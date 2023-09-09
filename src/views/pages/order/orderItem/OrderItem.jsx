import React, { useEffect, useState } from 'react';
import './orderItem.scss';
const formater = Intl.NumberFormat('de-DE');

const OrderProductItem = ({ product, productDetail }) => {
  return (
    <div className="product-item">
      <div className="product-img">
        <img src={product.img[0]} alt="" />
      </div>
      <div className="product-info">
        <div className="name">{product.name}</div>
        <p className="color">Color: {product.color}</p>
        <p className="size">Size: {product.size}</p>
        <p className="quantity">Quantity: {product.quantity}</p>
        <p className="price">{formater.format(product.priceLimited)}</p>
      </div>
    </div>
  );
};

const OrderItem = ({ order }) => {
  return (
    <div id="orderItem">
      <div className="info">
        <div className="item-info address">
          <h4>DELIVERY ADDRESS:</h4>
          {/* <p>
            <b>Full Name: </b>
            {order.address.fullName}
          </p>
          <p>
            <b>Phone:</b> {order.address.phone}
          </p>
          <p>
            <b>Address:</b> {` ${order.address.addressDetail}, ${order.address.address}`}
          </p> */}
        </div>
        <div className="item-info">
          <h4>AMOUNT: {order.amount}</h4>
        </div>
        <div className="item-info">
          <h4>SUBTOTAL: {formater.format(order.subtotal)}</h4>
        </div>
        <div className="item-info">
          <h4>SHIPPING FEE: {formater.format(order.shippingFee)}</h4>
        </div>
        <div className="item-info">
          <h4>TOTAL: {formater.format(order.total)}</h4>
        </div>
        <div className="item-info">
          <p>Status: {order.status}</p>
        </div>
      </div>
      <div className="list-product">
        {order.orderItems.map(
          (item, index) => null,
          // <OrderProductItem key={index} product={item} />
        )}
      </div>
    </div>
  );
};

export default OrderItem;
