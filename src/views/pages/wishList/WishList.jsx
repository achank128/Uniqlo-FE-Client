import React, { useEffect } from 'react';
import './wishList.scss';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
//components
import { useDispatch, useSelector } from 'react-redux';
import { removeWishList, wishListSelector } from '../../../redux/slices/wishListSlice';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
const formater = Intl.NumberFormat('de-DE');

const WishList = () => {
  const { t, i18n } = useTranslation();
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
                  <Link to="/">{t('common_uniqlo')}</Link>
                </li>
                <li className="slash">/</li>
                <li>{t('wish_list')}</li>
              </ul>
            </div>
            <div className="wishlist-title">
              <h2>{t('wish_list')}</h2>
            </div>
            <div className="list-items">
              <div className="amount-item">
                {wishList.length > 0
                  ? `${wishList.length} ${t('common_items')}`
                  : t('wish_list_no_item')}
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
                          <div className="name">
                            {i18n.language === 'en'
                              ? item.product?.nameEn
                              : i18n.language === 'vi'
                              ? item.product?.nameVi
                              : item.product?.name}
                          </div>
                          <p className="for">
                            {i18n.language === 'en'
                              ? item.product?.genderType.nameEn
                              : i18n.language === 'vi'
                              ? item.product?.genderType.nameVi
                              : item.product?.genderType.name}
                          </p>
                          <div className="id">
                            {t('product_id')}: {item.productId}
                          </div>
                          <div className="price">
                            {item.product?.isSale ? (
                              <>
                                <div className="price-original">
                                  {formater.format(item.product?.productPrice.price)} VND
                                </div>
                                <div className="price-limited">
                                  {formater.format(item.product?.productPrice.promoPrice)} VND
                                </div>
                                <div className="sale">{t('common_sale')}</div>
                              </>
                            ) : (
                              <div className="price-only">
                                {formater.format(item.product?.productPrice.price)} VND
                              </div>
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
