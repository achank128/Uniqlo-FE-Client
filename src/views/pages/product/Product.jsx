import React, { useEffect, useState } from 'react';
import './product.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Facebook,
  KeyboardArrowDown,
  Star,
  Twitter,
} from '@mui/icons-material';
import { Grid, MenuItem, Rating, Select, Slider } from '@mui/material';
import {
  addCartItem,
  amountSelector,
  cartAction,
  cartSelector,
  loadingCartSelector,
  subTotalSelector,
} from '../../../redux/slices/cartSlice';
import { formater } from '../../../utils';
import { addWishList } from '../../../redux/slices/wishListSlice';
import productApi from '../../../api/apiProduct';
import RatingStar from '../../components/ratingStar/RatingStar';
import Loading from '../../components/loading/Loading';
import Confirm from '../../components/confirm/Confirm';
import { userSelector } from '../../../redux/slices/authSlice';
import reviewApi from '../../../api/apiReview';
import { toast } from 'react-toastify';
import { HowToFits } from '../../../utils/const';

const Product = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  const amount = useSelector(amountSelector);
  const subtotal = useSelector(subTotalSelector);
  const isLoadingCart = useSelector(loadingCartSelector);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [inStock, setInStock] = useState(1);
  const [overviewOn, setOverviewOn] = useState(false);
  const [materialOn, setMaterialOn] = useState(false);
  const [quantityOn, setQuantityOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [productSizeSorted, setProductSizeSorted] = useState([]);
  const [openCartConfirm, setOpenCartConfirm] = useState(false);
  const [openAddReview, setOpenAddReview] = useState(false);
  const [filterReview, setFilterReview] = useState({
    pageIndex: 1,
    pageSize: 10,
    productId: id,
    star: null,
  });
  const [reviewsData, setReviewsData] = useState();
  const [loadingAR, setLoadingAR] = useState(false);
  const [review, setReview] = useState({
    star: null,
    title: '',
    content: '',
    sizeId: '',
    fit: 3,
  });

  const {
    isLoading,
    isError,
    data: product,
  } = useQuery(['product', id], ({ queryKey }) => productApi.getProduct(queryKey[1]));

  const { isLoading: isLoadingPD, data: productDetails } = useQuery(
    ['productDetails', id],
    ({ queryKey }) => productApi.getProductDetails(queryKey[1]),
  );

  const marks = [
    {
      value: 1,
      label: t('review_fit_tight'),
    },
    {
      value: 2,
      label: t('review_fit_abit_tight'),
    },
    {
      value: 3,
      label: t('review_fit_true'),
    },
    {
      value: 4,
      label: t('review_fit_abit_loose'),
    },
    {
      value: 5,
      label: t('review_fit_loose'),
    },
  ];

  const lengthImg = product?.productImages?.length;
  const nextImg = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > lengthImg - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevImg = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = lengthImg - 1;
      }
      return index;
    });
  };
  const changeImg = (indexImg) => {
    setIndex(indexImg);
  };

  const handleAddToCart = () => {
    if (inStock > 0) {
      let productDetail = productDetails.find(
        (pd) => pd.colorId === color.colorId && pd.sizeId === size.sizeId,
      );

      let body = {
        cartId: cart.id,
        productDetailId: productDetail.id,
        productDetail,
        product,
        quantity: quantity,
      };

      dispatch(addCartItem(body)).then(() => {
        dispatch(cartAction.updateTotal());
        setOpenCartConfirm(true);
      });
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const body = {
      productId: product.id,
      userId: user.id,
      star: review.star,
      title: review.title,
      content: review.content,
      sizeId: review.sizeId,
      fit: review.fit,
    };
    try {
      setLoadingAR(true);
      const res = await reviewApi.addReview(body);
      toast.success(res.message);
      setOpenAddReview(false);
      setLoadingAR(false);
      handleGetReviews();
      setReview({
        star: null,
        title: '',
        content: '',
        sizeId: '',
        fit: 3,
      });
    } catch (error) {
      setLoadingAR(false);
      toast.error(error.response.data.Message);
    }
  };

  const handleGetReviews = async (filter) => {
    const res = await reviewApi.getReivewsProduct(filter);
    setReviewsData(res);
  };

  useEffect(() => {
    if (product) {
      let productSizes = [...product?.productSizes];
      setProductSizeSorted(productSizes.sort((a, b) => a.size.level - b.size.level));
    }
  }, [product]);

  useEffect(() => {
    handleGetReviews(filterReview);
  }, [filterReview]);

  useEffect(() => {
    if (color && size) {
      let productDetail = productDetails.find(
        (pd) => pd.colorId === color.colorId && pd.sizeId === size.sizeId,
      );
      if (productDetail) {
        if (productDetail.inStock > 0 && productDetail.inStock > quantity) {
          setInStock(productDetail.inStock);
        } else {
          setInStock(0);
        }
      } else {
        setInStock(0);
      }
    } else {
      setInStock(0);
    }
  }, [color, size, quantity, productDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) return <div>Something went wrong...</div>;

  if (isLoading && isLoadingPD)
    return (
      <div style={{ height: '60vh' }}>
        <Loading />
      </div>
    );

  return (
    <div id="product">
      {isLoadingCart && (
        <div id="loading-overlay">
          <Loading />
        </div>
      )}
      {product && (
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">{t('common_uniqlo')}</Link>
                </li>
                <li className="slash">/</li>
                <li>
                  <Link to="/products">{t('product_all')}</Link>
                </li>
                <li className="slash">/</li>
                <li>{product.name}</li>
              </ul>
            </div>
            <Grid container spacing={10} className="product-content">
              <Grid item md={7} xs={12} className="product-img-detail">
                <div className="product-img">
                  <div className="list-img">
                    {product.productImages?.map((img, indexImg) => {
                      let imgCurrent = '';
                      if (indexImg === index) {
                        imgCurrent = 'img-current';
                      } else {
                        imgCurrent = '';
                      }
                      return (
                        <div
                          key={indexImg}
                          className={imgCurrent + ' img-item'}
                          onClick={() => changeImg(indexImg)}
                        >
                          <img src={img.imageUrl} alt="" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="img-primary">
                    {product?.productImages?.map((img, indexImg) => {
                      let positionImg = 'next-img';
                      if (indexImg === index) {
                        positionImg = 'active-img';
                      }
                      if (indexImg === index - 1 || (index === 0 && indexImg === lengthImg - 1)) {
                        positionImg = 'prev-img';
                      }
                      return (
                        <div key={indexImg} className={positionImg + ' ipi'}>
                          <img src={img.imageUrl} alt="" />
                        </div>
                      );
                    })}
                    <button className="img-prev" onClick={prevImg}>
                      <ArrowBackIos className="prev-icon" />
                    </button>
                    <button className="img-next" onClick={nextImg}>
                      <ArrowForwardIos className="next-icon" />
                    </button>
                    <p>
                      {index + 1}/{lengthImg}
                    </p>
                  </div>
                </div>
                <div className="product-desc-detail">
                  <div className="title-id">
                    <h3>{t('common_description')}</h3>
                    <p>
                      {t('product_id')}: {product.id}
                    </p>
                  </div>
                  <div className="overview">
                    <div className="overview-head" onClick={() => setOverviewOn(!overviewOn)}>
                      <span className={overviewOn ? 'bold' : null}>{t('common_overview')}</span>
                      <span className={overviewOn ? 'arrow-up arrow-down' : 'arrow-down'}>
                        <KeyboardArrowDown className="arrow-down-icon" />
                      </span>
                    </div>
                    <div className={overviewOn ? 'overview-info active' : 'overview-info'}>
                      {i18n.language === 'en'
                        ? product.overviewEn
                        : i18n.language === 'vi'
                        ? product.overviewVi
                        : product.overview}
                    </div>
                  </div>
                  <div className="material">
                    <div className="material-head" onClick={() => setMaterialOn(!materialOn)}>
                      <span className={materialOn ? 'bold' : null}>{t('common_material')}</span>
                      <span className={materialOn ? 'arrow-up arrow-down' : 'arrow-down'}>
                        <KeyboardArrowDown className="arrow-down-icon" />
                      </span>
                    </div>
                    <div className={materialOn ? 'material-info active' : 'material-info'}>
                      {i18n.language === 'en'
                        ? product.materialsEn
                        : i18n.language === 'vi'
                        ? product.materialsVi
                        : product.materials}
                    </div>
                  </div>
                  <div className="return-policy">
                    <Link to="/">
                      <div className="return-policy-head">
                        <span>{t('common_return_policy')}</span>
                        <span className="arrow-down">
                          <KeyboardArrowDown className="arrow-down-icon" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="product-review">
                  <div className="title">
                    <h3>{t('review_reviews')}</h3>
                    {product.productReview && (
                      <div className="rating">
                        <div className="star">
                          <RatingStar rating={product.productReview?.star} />
                        </div>
                        <span className="review-count">({product.productReview?.amount})</span>
                      </div>
                    )}
                  </div>
                  <Grid container className="statistics">
                    <Grid item md={4} xs={12} className="rating-star">
                      <h4>{t('review_ratings')}</h4>
                      <div className="stars">
                        <div className="star-amount">
                          <Rating
                            name="hover-feedback"
                            className="star"
                            readOnly
                            defaultValue={5}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <span className="amount"> (100)</span>
                        </div>
                        <div className="star-amount">
                          <Rating
                            name="hover-feedback"
                            className="star"
                            readOnly
                            defaultValue={4}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <span className="amount"> (3)</span>
                        </div>
                        <div className="star-amount">
                          <Rating
                            name="hover-feedback"
                            className="star"
                            readOnly
                            defaultValue={3}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <span className="amount"> (1)</span>
                        </div>
                        <div className="star-amount">
                          <Rating
                            name="hover-feedback"
                            className="star"
                            readOnly
                            defaultValue={2}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <span className="amount"> (0)</span>
                        </div>
                        <div className="star-amount">
                          <Rating
                            name="hover-feedback"
                            className="star"
                            readOnly
                            defaultValue={1}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <span className="amount"> (0)</span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={8} xs={12} className="fits">
                      <h4>{t('review_howtofits')}</h4>
                      <div className="fit">
                        <Slider defaultValue={3} step={1} marks={marks} min={1} max={5} disabled />
                      </div>
                    </Grid>
                    <button className="btn-write-review" onClick={() => setOpenAddReview(true)}>
                      {t('review_write')}
                    </button>
                  </Grid>
                  {openAddReview && (
                    <form className="write-review" onSubmit={handleAddReview}>
                      <h3>{t('review_write')}</h3>
                      <div className="input-container center">
                        <label className="label">
                          {t('review_ratings')}
                          <span>*</span>
                        </label>
                        <div className="input">
                          <Rating
                            name="hover-feedback"
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                            value={review.star}
                            onChange={(e, value) => setReview({ ...review, star: value })}
                          />
                        </div>
                      </div>
                      <div className="input-container center">
                        <label className="label">
                          {t('review_howtofits')}
                          <span>*</span>
                        </label>
                        <div className="input">
                          <Slider
                            defaultValue={3}
                            color="error"
                            step={1}
                            marks={marks}
                            min={1}
                            max={5}
                            value={review.fit}
                            onChange={(e, value) => setReview({ ...review, fit: value })}
                          />
                        </div>
                      </div>
                      <div className="input-container">
                        <label className="label">
                          {t('common_title')}
                          <span>*</span>
                        </label>
                        <div className="input">
                          <input
                            type="text"
                            name="title"
                            placeholder={t('common_title')}
                            value={review.title}
                            onChange={(e) => setReview({ ...review, title: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="input-container">
                        <label className="label">
                          {t('common_comment')}
                          <span>*</span>
                        </label>
                        <div className="input">
                          <textarea
                            name="comment"
                            placeholder={t('common_comment')}
                            value={review.content}
                            onChange={(e) => setReview({ ...review, content: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="input-container">
                        <label className="label">
                          {t('review_purchased_size')}
                          <span>*</span>
                        </label>
                        <div className="input">
                          <Select
                            fullWidth
                            id="size"
                            placeholder={t('common_size')}
                            value={review.sizeId}
                            onChange={(e) => setReview({ ...review, sizeId: e.target.value })}
                          >
                            {productSizeSorted?.map((size) => (
                              <MenuItem key={size.id} value={size.sizeId}>
                                {size.size?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="submit">
                        <button disabled={loadingAR} className="btn-submit" type="submit">
                          {t('common_submit')}
                        </button>
                        <button
                          disabled={loadingAR}
                          className="btn-cancel"
                          onClick={() => setOpenAddReview(false)}
                        >
                          {t('common_cancel')}
                        </button>
                      </div>
                    </form>
                  )}
                  {reviewsData && (
                    <div className="reviews">
                      <h4>
                        {reviewsData.totalRecords} {t('review_reviews')}
                      </h4>
                      <div className="review-list">
                        {reviewsData.data.map((review) => (
                          <div className="review-item">
                            <h3>{review.title}</h3>
                            <Rating
                              name="hover-feedback"
                              className="star"
                              readOnly
                              defaultValue={review.star}
                              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            <p>
                              {t('review_purchased_size')}: {review.size?.name}
                            </p>
                            <p className="fit">
                              {t('review_howtofits')}: {t(HowToFits[review.fit])}
                            </p>
                            <p>{review.content}</p>
                          </div>
                        ))}
                      </div>
                      {filterReview.pageSize <= reviewsData.totalRecords && (
                        <div className="load-more">
                          <button
                            onClick={() =>
                              setFilterReview({
                                ...filterReview,
                                pageSize: filterReview.pageSize + 10,
                              })
                            }
                          >
                            {t('common_load_more')} <KeyboardArrowDown className="icon-down" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item md={5} xs={12} className="product-info">
                <div className="top">
                  <div className="title-name">
                    <h1>{product?.name}</h1>
                  </div>
                  <div className="price-rating">
                    <div className="price">
                      {product.isSale ? (
                        <>
                          <div className="price-original">
                            {formater.format(product.productPrice?.price)} VND
                          </div>
                          <div className="price-limited">
                            {formater.format(product.productPrice?.promoPrice)} VND
                          </div>
                          <div className="price-flag">Sale</div>
                        </>
                      ) : (
                        <div className="price-only">
                          {formater.format(product.productPrice?.price)} VND
                        </div>
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
                  <p className="description">
                    {i18n.language === 'en'
                      ? product.descriptionEn
                      : i18n.language === 'vi'
                      ? product.descriptionVi
                      : product.description}
                  </p>
                </div>
                <div className="bottom">
                  <div className="color">
                    <div className="color-name">
                      {t('common_color')}: {color?.color.name}
                    </div>
                    <ul className="color-list">
                      {product.productColors?.map((pc) => (
                        <li
                          key={pc.id}
                          className={color?.id === pc.id ? 'color-selected' : ''}
                          onClick={() => setColor(pc)}
                        >
                          <div style={{ backgroundColor: pc.color?.code }}></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="size">
                    <div className="size-name">
                      {t('common_size')}: {size?.size.name}
                    </div>
                    <ul className="size-list">
                      {productSizeSorted.map((ps) => (
                        <li
                          key={ps.id}
                          className={size?.id === ps.id ? 'size-selected' : ''}
                          onClick={() => setSize(ps)}
                        >
                          {ps.size.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="quanlity">
                    <div className="quanlity-name">{t('common_quantity')}</div>
                    <div
                      className="quality-select"
                      onClick={() => {
                        setQuantityOn(!quantityOn);
                      }}
                    >
                      <span>{quantity}</span>
                      <span className={quantityOn ? 'arrow-up arrow-down' : 'arrow-down'}>
                        <KeyboardArrowDown className="arrow-down-icon" />
                      </span>
                    </div>
                    <ul className={quantityOn ? 'quanlity-list active' : 'quanlity-list'}>
                      <li
                        className={quantity === 1 ? 'quanlity-selected' : ''}
                        onClick={() => {
                          setQuantity(1);
                          setQuantityOn(!quantityOn);
                        }}
                      >
                        1
                      </li>
                      <li
                        className={quantity === 2 ? 'quanlity-selected' : ''}
                        onClick={() => {
                          setQuantity(2);
                          setQuantityOn(!quantityOn);
                        }}
                      >
                        2
                      </li>
                      <li
                        className={quantity === 3 ? 'quanlity-selected' : ''}
                        onClick={() => {
                          setQuantity(3);
                          setQuantityOn(!quantityOn);
                        }}
                      >
                        3
                      </li>
                    </ul>
                    {size &&
                      color &&
                      (inStock > 0 ? (
                        <p className="in-stock">{t('product_in_stock')}</p>
                      ) : (
                        <p className="in-stock">{t('product_out_of_stock')}</p>
                      ))}
                  </div>
                  <button
                    className={inStock > 0 ? 'add-to-cart add-active' : 'add-to-cart'}
                    onClick={handleAddToCart}
                  >
                    {t('product_add_to_cart')}
                  </button>
                  <div className="fav-find">
                    <button className="favorite-add" onClick={() => dispatch(addWishList(product))}>
                      {t('product_add_to_wishlist')}
                    </button>
                    <button className="find-store"> {t('product_find_in_store')}</button>
                  </div>
                  <div className="share">
                    <div className="share-name"> {t('common_share')}</div>
                    <div className="share-icon">
                      <Twitter className="icon-tw" />
                      <Facebook className="icon-fb" />
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      <Confirm
        open={openCartConfirm}
        setOpen={setOpenCartConfirm}
        titleText="cart_item_added"
        confirmText="cart_view"
        cancelText="common_continue_shopping"
        Content={() => (
          <>
            <div className="item-confirm">
              <div>{t('common_items')}:</div>
              <div>{amount}</div>
            </div>
            <div className="total-confirm">
              <div>{t('common_order_total')}</div>
              <div>{formater.format(subtotal)} VND</div>
            </div>
          </>
        )}
        onConfirm={() => navigate('/cart')}
      />
    </div>
  );
};

export default Product;
