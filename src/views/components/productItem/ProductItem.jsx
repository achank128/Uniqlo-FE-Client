import React, { useEffect, useState } from 'react';
import './productItem.scss';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
//components
import RatingStar from '../ratingStar/RatingStar';
import { useDispatch } from 'react-redux';

const ProductItem = ({ product }) => {
  const { formater } = useGlobalContext();
  //const [isAddToWishList, setIsAddToWishList] = useState(false);
  const dispatch = useDispatch();

  return (
    <div id="product-item">
      <div className="favorite-add">
        <span
          onClick={() => {
            // if (isAddToWishList) {
            //   removeFromWishList(product._id);
            // } else {
            //   addToWishList(product);
            // }
            // setIsAddToWishList(!isAddToWishList);
          }}
        >
          <FavoriteBorder className="favorite-border-icon" />
          {/* <Favorite className={isAddToWishList ? 'favorite-icon active' : 'favorite-icon'} /> */}
        </span>
      </div>
      <Link to={`/product/${product.id}`}>
        <div className="product-img">
          <img src={product?.productImages[0]?.imageUrl} alt="" />
        </div>
        <div className="product-info">
          <div className="for-size">
            <div className="for">{product.genderType?.name}</div>
            <div className="size">{product.size}</div>
          </div>
          <p className="name">{product.name}</p>
          <div className="price">
            <span className="price-original">
              {formater.format(product.productPrice?.price)} VND
            </span>
            {product.isSale && (
              <span className="price-limited">
                {formater.format(product.productPrice?.promoPrice)} VND
              </span>
            )}
          </div>
          <div className="price-flag">Sale</div>
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
