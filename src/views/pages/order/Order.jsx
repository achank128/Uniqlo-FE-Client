import React, { useEffect, useState } from 'react';
import './order.scss';

import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {loading ? (
        <div id="loading-overlay">
          <Loading />
        </div>
      ) : null}
      <div id="order">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>

                <li className="slash">/</li>
                <li>Orders</li>
              </ul>
            </div>
            <div className="profile-title">
              <h2>ORDERS</h2>
            </div>
            <div className="content">
              {userOrders ? (
                <div className="order">
                  <div className="heading">
                    <h3>ORDER</h3>
                  </div>
                  <div className="list">
                    {userOrders.map((order) => (
                      <Order key={order._id} order={order} />
                    ))}
                  </div>
                </div>
              ) : (
                <div id="loading-container">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
