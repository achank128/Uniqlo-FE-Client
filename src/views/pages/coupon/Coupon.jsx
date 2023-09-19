import { Delete } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import './coupon.scss';
import { useQuery } from 'react-query';
import couponApi from '../../../api/apiCoupon';
import Loading from '../../components/loading/Loading';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const Coupon = () => {
  const { t } = useTranslation();
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

  return (
    <div id="coupon">
      <div className="heading">
        <h3>{t('common_coupon')}</h3>
        <form className="search-coupon" onSubmit={handleAddCoupon}>
          <TextField
            size="small"
            label={t('common_coupon_code')}
            variant="outlined"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </form>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="coupon-list">
          {coupons.map((coupon) => (
            <div className="item" key={coupon.id}>
              <div className="item-content">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coupon;
