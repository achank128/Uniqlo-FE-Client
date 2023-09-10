import React, { useEffect, useState } from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authAction, userSelector } from '../../../redux/slices/authSlice';

//components
import Flyout from './flyout/Flyout';
import Announcement from './announcement/Announcement';
import { categoryApi } from '../../../api/apiCategory';
import { genderTypeApi } from '../../../api/apiGenderType';
import { amountSelector, cartAction, getCart } from '../../../redux/slices/cartSlice';
import { getWishList, wishListSelector } from '../../../redux/slices/wishListSlice';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  const amount = useSelector(amountSelector);
  const wishList = useSelector(wishListSelector);

  const [userOpen, setUserOpen] = useState(false);
  const [isFlyOutOn, setIsFlyOutOn] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [genderType, setGenderType] = useState([]);
  const [CategoriesWomen, setCategoriesWomen] = useState([]);
  const [CategoriesMen, setCategoriesMen] = useState([]);
  const [CategoriesKids, setCategoriesKids] = useState([]);
  const [CategoriesBaby, setCategoriesBaby] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getCategoriesWomen = async () => {
    const data = await categoryApi.getCategories(1);
    setCategoriesWomen(data);
  };

  const getCategoriesMen = async () => {
    const data = await categoryApi.getCategories(2);
    setCategoriesMen(data);
  };

  const getCategoriesKids = async () => {
    const data = await categoryApi.getCategories(3);
    setCategoriesKids(data);
  };

  const getCategoriesBaby = async () => {
    const data = await categoryApi.getCategories(4);
    setCategoriesBaby(data);
  };

  const getGenderTypes = async () => {
    const data = await genderTypeApi.getGenderTypes();
    setGenderType(data);
  };

  useEffect(() => {
    getGenderTypes();
    getCategoriesWomen();
    getCategoriesMen();
    getCategoriesKids();
    getCategoriesBaby();
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getCart()).then(() => {
        dispatch(cartAction.updateTotal());
      });
      dispatch(getWishList());
    }
  }, [currentUser]);

  //hover item
  const handleHoverOn = (item) => {
    if (item === 'WOMEN') {
      setCategories(CategoriesWomen);
      setCategory('');
    }
    if (item === 'MEN') {
      setCategories(CategoriesMen);
      setCategory('');
    }
    if (item === 'KIDS') {
      setCategories(CategoriesKids);
      setCategory('');
    }
    if (item === 'BABY') {
      setCategories(CategoriesBaby);
      setCategory('');
    }
  };

  return (
    <div id="topbar">
      <Announcement onMouseEnter={() => setCategory('')} />
      <div id="navbar" onMouseEnter={() => setCategory('')}>
        <div className="container">
          <div className="wrapper">
            <div className="nav-left">
              <div className="logo" onMouseEnter={() => setCategory('')}>
                <Link to="/">
                  <img
                    src="https://static.ybox.vn/2020/3/3/1583256466060-Thie%CC%82%CC%81t%20ke%CC%82%CC%81%20kho%CC%82ng%20te%CC%82n%20(96).png"
                    alt="logo"
                  />
                </Link>
              </div>
              <ul
                onMouseLeave={() => {
                  setIsFlyOutOn(false);
                }}
              >
                {genderType.map((item) => (
                  <Link to={`/products`} key={item.id}>
                    <li>
                      <span
                        className={item.name === category ? 'item-hover' : ''}
                        onMouseEnter={() => {
                          setIsFlyOutOn(true);
                          handleHoverOn(item.name);
                          setCategory(item.name);
                        }}
                      >
                        {i18n.language === 'en'
                          ? item.nameEn
                          : i18n.language === 'vi'
                          ? item.nameVi
                          : item.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            <div className="nav-center" onMouseEnter={() => setCategory('')}></div>

            <div className="nav-right">
              <div className="searchform item">
                <form onSubmit={() => {}}>
                  <input
                    className="search-input"
                    type="text"
                    value={searchText}
                    placeholder={t('common_search_by_keyword')}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button type="submit" className="search-btn">
                    <Search className="search-icon" />
                  </button>
                </form>
              </div>

              {currentUser ? (
                <div className="login item">
                  <span onClick={() => setUserOpen(!userOpen)}>
                    <PersonOutlineOutlined className="icon" />
                  </span>
                  <div className={userOpen ? 'user open' : 'user'}>
                    <ul>
                      <Link to="/profile" onClick={() => setUserOpen(false)}>
                        <li>{t('profile')}</li>
                      </Link>
                      <Link to="/profile/coupon" onClick={() => setUserOpen(false)}>
                        <li>{t('common_coupon')}</li>
                      </Link>
                      <Link to="/profile/order" onClick={() => setUserOpen(false)}>
                        <li>{t('order_history')}</li>
                      </Link>
                      <Link to="/wishlist" onClick={() => setUserOpen(false)}>
                        <li>{t('wish_list')}</li>
                      </Link>
                      <li
                        onClick={() => {
                          dispatch(authAction.handleLogOut());
                          navigate('/login');
                          setUserOpen(false);
                        }}
                      >
                        {t('auth_logout')}
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="login item">
                  <Link to="/login">
                    <span>
                      <PersonOutlineOutlined className="icon" />
                    </span>
                  </Link>
                </div>
              )}
              <div className="favorite item">
                <Link to="/wishlist">
                  <span>
                    <FavoriteBorder className="icon" />
                  </span>
                </Link>
                <div className={wishList.length > 0 ? 'wishlist-amount active' : 'wishlist-amount'}>
                  {wishList.length}
                </div>
              </div>
              <div className="cart item">
                <Link to="/cart">
                  <span>
                    <ShoppingCartOutlined className="icon" />
                  </span>
                </Link>
                <div className={amount > 0 ? 'cart-amount active' : 'cart-amount'}>{amount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Flyout
        classNameAdd={isFlyOutOn ? 'fly-out-active' : ''}
        setIsFlyOutOn={setIsFlyOutOn}
        categories={categories}
        category={category}
      />
    </div>
  );
};

export default Navbar;
