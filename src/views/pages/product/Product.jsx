import React, { useEffect, useState } from 'react';
import './product.scss';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Facebook,
  KeyboardArrowDown,
  Twitter,
} from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  addCartItem,
  amountSelector,
  cartAction,
  cartSelector,
  loadingCartSelector,
  subTotalSelector,
} from '../../../redux/slices/cartSlice';
import { addWishList } from '../../../redux/slices/wishListSlice';
import productApi from '../../../api/apiProduct';
import RatingStar from '../../components/ratingStar/RatingStar';
import Loading from '../../components/loading/Loading';

const formater = Intl.NumberFormat('de-DE');

const Product = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
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

  const {
    isLoading,
    isError,
    data: product,
  } = useQuery(['product', id], ({ queryKey }) => productApi.getProduct(queryKey[1]));

  const { isLoading: isLoadingPD, data: productDetails } = useQuery(
    ['productDetails', id],
    ({ queryKey }) => productApi.getProductDetails(queryKey[1]),
  );

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

  useEffect(() => {
    if (product) {
      let productSizes = [...product?.productSizes];
      setProductSizeSorted(productSizes.sort((a, b) => a.size.level - b.size.level));
    }
  }, [product]);

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
            <div className="product-content">
              <div className="product-img-detail">
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
              </div>
              <div className="product-info">
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
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog
        id="cart-confirm"
        open={openCartConfirm}
        onClose={() => setOpenCartConfirm(false)}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle className="title">{t('cart_item_added')}</DialogTitle>
        <DialogContent>
          <div className="item-confirm">
            <div>{t('common_items')}:</div>
            <div>{amount}</div>
          </div>
          <div className="total-confirm">
            <div>{t('common_order_total')}</div>
            <div>{formater.format(subtotal)} VND</div>
          </div>
        </DialogContent>
        <div className="confirm-action">
          <Link to={'/cart'} style={{ flex: '1' }}>
            <button className="btn-cart-view">{t('cart_view')}</button>
          </Link>
          <button className="btn-continue" onClick={() => setOpenCartConfirm(false)}>
            {t('common_continue_shopping')}
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Product;
