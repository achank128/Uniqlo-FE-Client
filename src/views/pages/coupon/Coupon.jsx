import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import './coupon.scss';
import { useQuery } from 'react-query';
import couponApi from '../../../api/apiCoupon';
import Loading from '../../components/loading/Loading';

const Coupon = () => {
  const { isLoading, data: coupons } = useQuery(['coupons'], () => couponApi.getMyCoupon());

  return (
    <div id="coupon">
      <div className="heading">
        <h3>COUPONS</h3>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="coupon-list">
          {coupons.map((coupon) => (
            <div className="item" key={coupon.id}>
              <IconButton aria-label="delete" className="btn-remove" onClick={() => {}}>
                <Close />
              </IconButton>
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
                  <div className="code">Coupon Code: {coupon.code}</div>
                  <p>Expiration Date: {coupon.endDate}</p>
                  <span className="limited">Limited</span>
                  <p>{coupon.description}</p>
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
