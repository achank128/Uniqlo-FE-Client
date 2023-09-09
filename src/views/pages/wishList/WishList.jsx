import React, { useEffect } from 'react';
import './wishList.scss';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
//components
import { useDispatch, useSelector } from 'react-redux';
import { removeWishList, wishListSelector } from '../../../redux/slices/wishListSlice';
import { IconButton } from '@mui/material';
const formater = Intl.NumberFormat('de-DE');

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector(wishListSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id="wish-list">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>Wish List</li>
              </ul>
            </div>
            <div className="title">
              <h2>WISH LIST</h2>
            </div>
            <div className="list-items">
              <div className="amount-item">
                {wishList.length > 0
                  ? `${wishList.length} item(s)`
                  : 'YOUR WISH LIST HAS NO ITEMS.'}
              </div>
              {wishList.length > 0 &&
                wishList.map((item) => {
                  return (
                    <div className="item" key={item.id}>
                      <IconButton
                        aria-label="delete"
                        className="btn-remove"
                        onClick={() => {
                          dispatch(removeWishList(item.id));
                        }}
                      >
                        <Close />
                      </IconButton>
                      <div className="item-content">
                        <Link to={`/product/${item.productId}`}>
                          <div className="img">
                            <img src={item?.product?.productImages[0]?.imageUrl} alt="" />
                          </div>
                        </Link>
                        <div className="info">
                          <div className="name">{item.product?.name}</div>
                          <div className="id">Product ID: {item.productId}</div>
                          <p>{item.product?.genderType.name}</p>
                          {/* <p>Size: {item.for}</p> */}
                          <div className="price">
                            <div className="price-original">
                              {formater.format(item.product?.productPrice.price)} VND
                            </div>
                            {item.product?.isSale && (
                              <>
                                <div className="price-limited">
                                  {formater.format(item.product?.productPrice.promoPrice)} VND
                                </div>
                                <div className="sale">Sale</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
