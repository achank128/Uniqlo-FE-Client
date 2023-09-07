import React, { useEffect, useState } from 'react';
import './productList.scss';
import { Link, useParams } from 'react-router-dom';
import productApi from '../../../api/apiProduct';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useQuery } from 'react-query';
//components
import Footer from '../../components/footer/Footer';
import Categories from '../../components/categories/Categories';
import ProductItem from './productItem/ProductItem';
import Loading from '../../components/loading/Loading';

const sorts = [
  { title: 'Featured', query: 'name_asc' },
  { title: 'New arrials', query: 'created_date_asc' },
  { title: 'Low to high', query: 'price_asc' },
  { title: 'High to low', query: 'price_desc' },
  { title: 'Top rated', query: 'star_desc' },
];

const ProductList = () => {
  const [listSortOn, setListSortOn] = useState(false);
  const [backToTopOn, setBackToTopOn] = useState(false);
  const [sort, setSort] = useState(sorts[0]);
  const [filter, setFilter] = useState({
    keyWord: '',
    sortBy: '',
    pageIndex: 1,
    pageSize: 12,
    categoryId: null,
    collectionId: null,
    sizeIds: [],
    colorIds: [],
    priceTypes: [],
    isSale: null,
    isOnlineOnly: null,
    isLimited: null,
  });

  const { isLoading, isError, data } = useQuery(['products', filter], ({ queryKey }) =>
    productApi.filterProducts(queryKey[1]),
  );

  const getProductsMore = async () => {
    setFilter({ ...filter, pageSize: filter.pageSize + 12 });
  };

  //Back to top
  const scrollFunction = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      setBackToTopOn(true);
    } else {
      setBackToTopOn(false);
    }
  };
  window.onscroll = function () {
    scrollFunction();
  };
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) return <div>Something went wrong...</div>;
  return (
    <>
      <div id="product-list">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>
                  <Link to="/product-list/ALL">All Products</Link>
                </li>
                {/* <li className="slash">/</li>
                <li>{category}</li> */}
              </ul>
            </div>
            <div className="sort-container">
              <div className="left">
                {data?.totalRecords && (
                  <div className="results">
                    <div className="title">RESULTS</div>
                    <p>{data.totalRecords} Items</p>
                  </div>
                )}
              </div>
              <div className="right">
                <div className="sort">
                  <div className="title">SORT BY</div>
                  <div className="sort-content" onClick={() => setListSortOn(!listSortOn)}>
                    <span>{sort.title}</span>
                    <span className={listSortOn ? 'arrow-up arrow-down' : 'arrow-down'}>
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <ul className={listSortOn ? 'active-list-sort list-sort' : 'list-sort'}>
                    {sorts.map((s, i) => (
                      <li
                        key={i}
                        className={s.title === sort.title ? 'selected' : ''}
                        onClick={() => {
                          setSort(s);
                          setFilter({ ...filter, sortBy: s.query });
                          setListSortOn(!listSortOn);
                        }}
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="list">
              <Categories />
              {isLoading ? (
                <Loading />
              ) : (
                <div className="products">
                  <div className="products-container">
                    {data.data.map((product) => {
                      return <ProductItem key={product.id} product={product} />;
                    })}
                  </div>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {filter.pageSize <= data.totalRecords && (
                        <div className="load-more">
                          <button onClick={getProductsMore}>
                            LOAD MORE <KeyboardArrowDown className="icon-down" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={backToTopOn ? 'backtotop-btn active' : 'backtotop-btn'} onClick={backToTop}>
          <div className="back">
            <span>
              <KeyboardArrowUp className="up-icon" />
            </span>
            <span>TOP</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
