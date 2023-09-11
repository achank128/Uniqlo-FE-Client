import React, { useEffect, useState } from 'react';
import './orderItem.scss';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Stack } from '@mui/material';
const formater = Intl.NumberFormat('de-DE');

const OrderProductItem = ({ orderItem }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="product-item">
      <div className="product-img">
        <img src={orderItem.productDetail.product.productImages[0]?.imageUrl} alt="" />
      </div>
      <div className="product-info">
        <div className="name">{orderItem.productDetail.product.name}</div>
        <p className="color">
          {t('common_color')}:{' '}
          {i18n.language === 'en'
            ? orderItem.productDetail.color?.nameEn
            : i18n.language === 'vi'
            ? orderItem.productDetail.color?.nameVi
            : orderItem.productDetail.color?.name}
        </p>
        <p className="size">
          {t('common_size')}:{' '}
          {i18n.language === 'en'
            ? orderItem.productDetail.size?.nameEn
            : i18n.language === 'vi'
            ? orderItem.productDetail.size?.nameVi
            : orderItem.productDetail.size?.name}
        </p>
        <p className="quantity">x {orderItem.quantity}</p>
        <p className="price">{formater.format(orderItem.price)} VND</p>
      </div>
    </div>
  );
};

const OrderItem = ({ order }) => {
  const { t } = useTranslation();
  return (
    <div id="orderItem">
      <Grid container spacing={2}>
        <Grid item md={6} className="info">
          <div className="status">
            <span className="order-status">{order.status}</span> |
            <span className="shipment-status">{order.shipments[0]?.status}</span>
          </div>
          <div className="date-info">
            {t('order_created_date')}: {order.createdDate}
          </div>
          <div className="item-info">
            <div>payment status: </div>
            <div>{order.payments[0]?.status}</div>
          </div>
          <div className="item-info">
            <div>{t('common_items')}: </div>
            <div>{order.amount}</div>
          </div>
          <div className="item-info">
            <div className="total">{t('common_order_total')}</div>
            <div className="total">{formater.format(order.total)} VND</div>
          </div>
          <div className="item-info">
            <div></div>
            <div className="desc">{t('thanhtoankhinhan')}</div>
          </div>
          <Stack spacing={2} direction="row" className="action">
            {order.status === 'OPEN' && (
              <Button variant="outlined" color="error">
                {t('order_cancel')}
              </Button>
            )}
            {order.status === 'CANCELED' && (
              <Button variant="contained" disabled>
                {t('common_canceled')}
              </Button>
            )}
          </Stack>
        </Grid>
        <Grid item md={6} className="list-product">
          {order.orderItems.map((item) => (
            <OrderProductItem key={item.id} orderItem={item} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderItem;
