import React, { useEffect } from 'react';
import './order.scss';
import Loading from '../../components/loading/Loading';
import { useQuery } from 'react-query';
import orderApi from '../../../api/apiOrder';
import OrderItem from './orderItem/OrderItem';
import { useTranslation } from 'react-i18next';

const Order = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    isError,
    data: userOrders,
    refetch,
  } = useQuery(['myorders'], () => orderApi.getMyOrders());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) return <div>Something went wrong...</div>;

  return (
    <div id="order">
      <div className="heading">
        <h3>{t('order')}</h3>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="list">
          {userOrders.map((order) => (
            <OrderItem key={order.id} order={order} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
