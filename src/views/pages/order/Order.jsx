import React, { useEffect } from 'react';
import './order.scss';
import Loading from '../../components/loading/Loading';
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

  if (isError) return <div>Something went wrong...</div>;

  return (
    <div id="order">
      <div className="heading">
        <h3>ORDER</h3>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="list">
          {userOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
