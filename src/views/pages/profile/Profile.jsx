import React, { useEffect } from 'react';
import './profile.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id="profile">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>

                <li className="slash">/</li>
                <li>Profile</li>
              </ul>
            </div>
            <div className="profile-title">
              <h2>MEMBERSHIP</h2>
            </div>
            <div className="content-wrapper">
              <div className="tab-content">
                <h4 className="heading">Membership</h4>
                <ul className="tab">
                  <li className={location.pathname === '/profile' ? 'active' : ''}>
                    <Link to={'/profile'}>Profile</Link>
                  </li>
                  <li className={location.pathname === '/profile/coupon' ? 'active' : ''}>
                    <Link to={'coupon'}>Coupons</Link>
                  </li>
                  <li className={location.pathname === '/profile/address' ? 'active' : ''}>
                    <Link to={'address'}>Addresses</Link>
                  </li>
                  <li className={location.pathname === '/profile/order' ? 'active' : ''}>
                    <Link to={'order'}>Order hisroty</Link>
                  </li>
                </ul>
              </div>
              <div className="content">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
