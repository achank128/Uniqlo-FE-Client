import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './addCoupon.scss';
import couponApi from '../../../api/apiCoupon';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import Loading from '../loading/Loading';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction, couponSelector, subTotalSelector } from '../../../redux/slices/cartSlice';

const AddCoupon = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const subtotal = useSelector(subTotalSelector);
  const couponApplied = useSelector(couponSelector);
  const [couponCode, setCouponCode] = useState('');
  const {
    isLoading,
    data: coupons,
    refetch,
  } = useQuery(['coupons'], () => couponApi.getMyCoupon());

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await couponApi.addCoupon(couponCode);
      toast.success(res.message);
      refetch();
      setCouponCode('');
    } catch (error) {
      toast.error(error.response.data.Message);
    }
  };

  const handleApplyCoupon = (coupon) => {
    dispatch(cartAction.addCoupon(coupon));
    setOpen(false);
  };

  return (
    <Dialog
      id="add-coupon"
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <IconButton
        sx={{
          position: 'absolute',
          right: 20,
          top: 20,
        }}
        onClick={() => setOpen(false)}
      >
        <Close />
      </IconButton>
      <DialogTitle className="title">{t('common_coupon')}</DialogTitle>
      <DialogContent>
        <div className="coupon-list">
          <form className="search-coupon" onSubmit={handleAddCoupon}>
            <TextField
              label={t('common_coupon_code')}
              variant="outlined"
              size="small"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn-add">{t('common_add')}</button>
          </form>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="list">
              {coupons?.map((coupon) => (
                <div className="item" key={coupon.id}>
                  {coupon.id === couponApplied?.id ? (
                    <Button
                      sx={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                      }}
                      variant="outlined"
                      disabled
                    >
                      {t('common_applied')}
                    </Button>
                  ) : subtotal > coupon.totalFrom ? (
                    <Button
                      variant="outlined"
                      color="info"
                      sx={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                      }}
                      onClick={() => handleApplyCoupon(coupon)}
                    >
                      {t('common_apply')}
                    </Button>
                  ) : null}
                  <div className="img">
                    <img
                      src={
                        coupon.imageUrl
                          ? coupon.imageUrl
                          : 'https://atpholdings.vn/wp-content/uploads/2020/06/coupon-la-gi.png'
                      }
                      alt="coupon"
                    />
                  </div>
                  <div className="info">
                    <div className="name">{coupon.title}</div>
                    <div className="code">
                      {t('common_coupon_code')}: {coupon.code}
                    </div>
                    <p>
                      {t('common_expired_date')}: {dayjs(coupon.endDate).format('DD/MM/YYYY')}
                    </p>
                    {coupon.percent ? (
                      <div className="discount">
                        <p>
                          {t('common_discount')}: {coupon.percent} %
                        </p>
                        <p>
                          {t('common_discount_max')}: {coupon.max} VND
                        </p>
                      </div>
                    ) : (
                      <p className="discount">
                        {t('common_discount')}: {coupon.discount} VND
                      </p>
                    )}

                    <p className="discount">
                      {t('common_total_from')}: {coupon.totalFrom} VND
                    </p>
                    {/* <span className="limited">Limited</span> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoupon;
