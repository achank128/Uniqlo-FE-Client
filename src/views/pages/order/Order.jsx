import React, { useEffect, useState } from 'react';
import './order.scss';
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import orderApi from '../../../api/apiOrder';
import OrderItem from './orderItem/OrderItem';

const Order = () => {
  const {
    isLoading,
    isError,
    data: userOrders,
  } = useQuery(['myorders'], () => orderApi.getMyOrders());

  useEffect(() => {
    console.log(userOrders);
    window.scrollTo(0, 0);
  }, [userOrders]);

  if (isError) return <div>Something wrong...</div>;

  return (
    <>
      {isLoading ? (
        <div id="loading-overlay">
          <Loading />
        </div>
      ) : (
        <div id="order">
          <div className="heading">
            <h3>ORDER</h3>
          </div>
          <div className="list">
            {userOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
