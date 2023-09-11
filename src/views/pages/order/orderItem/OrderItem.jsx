import React, { useEffect, useState } from 'react';
import './orderItem.scss';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { OrderStatus, PaymentStatus, PaymentTypes, ShipmentStatus } from '../../../../utils/const';
import Confirm from '../../../components/confirm/Confirm';
import orderApi from '../../../../api/apiOrder';
import { toast } from 'react-toastify';
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

const OrderItem = ({ order, refetch }) => {
  const { t } = useTranslation();
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  const handleCancelOrder = async (cancelReason) => {
    const body = {
      id: order.id,
      status: 'CANCELLED',
      reason: cancelReason,
    };
    try {
      const res = await orderApi.updateStatusOrder(body);
      toast.success(toast(res.message));
      setOpenCancelConfirm(false);
      refetch();
    } catch (error) {
      setOpenCancelConfirm(false);
      toast.error(t(error.response.data.Message));
    }
  };

  return (
    <div id="orderItem">
      <Grid container spacing={2}>
        <Grid item md={6} className="info">
          {order.status === 'CANCELLED' ? (
            <div className="status">
              <span className="order-status-cancel">{t(OrderStatus[order.status])}</span>
            </div>
          ) : (
            <div className="status">
              <span className="order-status">{t(OrderStatus[order.status])}</span> |
              <span className="shipment-status">
                {t(ShipmentStatus[order.shipments[0]?.status])}
              </span>
            </div>
          )}
          <div className="date-info">
            {t('order_created_date')}: {dayjs(order.createdDate).format('DD/MM/YYYY')}
          </div>
          {order.status === 'CANCELLED' ? (
            <div className="date-info">
              {t('order_cancel_date')}: {dayjs(order.updatedDate).format('DD/MM/YYYY')}
            </div>
          ) : (
            <div className="date-info">
              {t('order_received_date') + ` (${t('order_estimate')})`}:{' '}
              {dayjs(order.shipments[0]?.receivedDate).format('DD/MM/YYYY')}
            </div>
          )}
          <Box sx={{ mb: 2 }} />
          <div className="item-info">
            <div>{t('order_payment_status')}: </div>
            <div className="status">
              <b>{t(PaymentStatus[order.payments[0]?.status])}</b>
            </div>
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
            <div className="desc">{t(PaymentTypes[order.payments[0]?.paymentType])}</div>
          </div>
          <Stack spacing={2} direction="row" className="action">
            {order.status === 'OPEN' && (
              <Button variant="outlined" color="error" onClick={() => setOpenCancelConfirm(true)}>
                {t('order_cancel')}
              </Button>
            )}
            {order.status === 'CANCELLED' && (
              <Button variant="contained" disabled>
                {t('order_cancelded')}
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

      <Confirm
        open={openCancelConfirm}
        setOpen={setOpenCancelConfirm}
        titleText="order_confirm_cancel"
        Content={() => <p>{t('order_are_you_sure_cancel')}</p>}
        onConfirm={handleCancelOrder}
        isConfirmInput={true}
        inputLabel="order_reason_cancel"
      />
    </div>
  );
};

export default OrderItem;
