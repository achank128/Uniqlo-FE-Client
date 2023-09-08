import React, { useEffect, useState } from 'react';
import './profile.scss';
import { Link, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

//components
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import Details from './details/Details';
import Coupon from './coupon/Coupon';
import Address from './address/Address';

//other
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/slices/authSlice';

const Profile = () => {
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
                  <li>
                    <Link to={'/profile'}>Profile</Link>
                  </li>
                  <li>
                    <Link to={'coupon'}>Coupons</Link>
                  </li>
                  <li>
                    <Link to={'address'}>Addresses</Link>
                  </li>
                  <li>
                    <Link to={'/order'}>Order hisroty</Link>
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
      <Footer />
    </>
  );
};

export default Profile;
