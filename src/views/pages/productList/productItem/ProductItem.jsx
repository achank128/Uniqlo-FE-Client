import React, { useEffect, useState } from 'react';
import './productItem.scss';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
//components
import RatingStar from '../../../components/ratingStar/RatingStar';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWishList,
  removeWishList,
  wishListSelector,
} from '../../../../redux/slices/wishListSlice';
import { useTranslation } from 'react-i18next';
const formater = Intl.NumberFormat('de-DE');

const ProductItem = ({ product }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const wishList = useSelector(wishListSelector);
  const [isInWishList, setIsInWishList] = useState(null);

  useEffect(() => {
    let wish = wishList.find((w) => w.productId === product.id);
    if (wish) {
      setIsInWishList(wish);
    } else {
      setIsInWishList(null);
    }
  }, [wishList, product]);

  return (
    <div id="product-item">
      <div className="favorite-add">
        <span
          onClick={() => {
            if (isInWishList) {
              dispatch(removeWishList(isInWishList.id));
            } else {
              dispatch(addWishList(product));
            }
          }}
        >
          <FavoriteBorder className="favorite-border-icon" />
          <Favorite className={isInWishList ? 'favorite-icon active' : 'favorite-icon'} />
        </span>
      </div>
      <Link to={`/product/${product.id}`}>
        <div className="product-img">
          <img src={product?.productImages[0]?.imageUrl} alt="" />
        </div>
        <div className="product-info">
          <div className="for-size">
            <div className="for">
              {i18n.language === 'en'
                ? product.genderType?.nameEn
                : i18n.language === 'vi'
                ? product.genderType?.nameVi
                : product.genderType?.name}
            </div>
            <div className="size">{product.size}</div>
          </div>
          <p className="name">
            {i18n.language === 'en'
              ? product.nameEn
              : i18n.language === 'vi'
              ? product.nameVi
              : product.name}
          </p>
          <div className="price">
            {product.isSale ? (
              <>
                <span className="price-original">
                  {formater.format(product.productPrice?.price)} VND
                </span>
                <span className="price-limited">
                  {formater.format(product.productPrice?.promoPrice)} VND
                </span>
                <div className="price-flag">{t('common_sale')}</div>
              </>
            ) : (
              <span className="price-only">{formater.format(product.productPrice?.price)} VND</span>
            )}
          </div>
          {product.productReview && (
            <div className="rating">
              <div className="star">
                <RatingStar rating={product.productReview?.star} />
              </div>
              <span className="review-count">({product.productReview?.amount})</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
