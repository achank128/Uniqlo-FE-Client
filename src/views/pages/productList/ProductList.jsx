import React, { useEffect, useState } from 'react';
import './productList.scss';
import { useSearchParams } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import productApi from '../../../api/apiProduct';
//components
import ProductItem from './productItem/ProductItem';
import Categories from '../../components/categories/Categories';
import Loading from '../../components/loading/Loading';
import Filter from '../../components/filter/Filter';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import categoryApi from '../../../api/apiCategory';
import collectionApi from '../../../api/apiCollection';
import { sorts } from '../../../utils/const';

const ProductList = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const collectionId = searchParams.get('collection');
  const search = searchParams.get('search');
  const [listSortOn, setListSortOn] = useState(false);
  const [backToTopOn, setBackToTopOn] = useState(false);
  const [sort, setSort] = useState(sorts[0]);
  const [category, setCategory] = useState();
  const [collection, setCollection] = useState();
  const [filter, setFilter] = useState({
    keyWord: searchParams.get('search'),
    sortBy: 'name_asc',
    pageIndex: 1,
    pageSize: 12,
    categoryId: searchParams.get('category'),
    collectionId: searchParams.get('collection'),
    sizeIds: [],
    colorIds: [],
    priceMin: null,
    priceMax: null,
    isSale: null,
    isOnlineOnly: null,
    isLimited: null,
  });

  const {
    isLoading,
    isError,
    data: productsData,
  } = useQuery(['products', filter], ({ queryKey }) => productApi.filterProducts(queryKey[1]));

  const getCategory = async (id) => {
    const data = await categoryApi.getCategoryById(id);
    setCategory(data);
  };

  const getCollection = async (id) => {
    const data = await collectionApi.getCollectionById(id);
    setCollection(data);
  };

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
    if (categoryId) {
      getCategory(categoryId);
    } else {
      setCategory(null);
    }
    if (collectionId) {
      getCollection(collectionId);
    } else {
      setCollection(null);
    }

    setFilter({ ...filter, categoryId: categoryId, collectionId: collectionId, keyWord: search });
  }, [categoryId, collectionId, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) return <div>Something went wrong...</div>;
  return (
    <div id="product-list">
      <div className="container">
        <div className="wrapper">
          <Breadcrumb />

          <div className="head-title">
            {category && (
              <h1>
                {i18n.language === 'en'
                  ? category.nameEn
                  : i18n.language === 'en'
                  ? category.nameVi
                  : category.name}
              </h1>
            )}
            {collection && (
              <h1>
                {i18n.language === 'en'
                  ? collection.nameEn
                  : i18n.language === 'en'
                  ? collection.nameVi
                  : collection.name}
              </h1>
            )}
          </div>

          <div className="sort-container">
            <div className="left">
              <div className="results">
                <div className="title">{t('common_results')}</div>
                <p>
                  {productsData?.totalRecords} {t('common_items')}
                </p>
              </div>
            </div>
            <div className="right">
              <div className="sort">
                <div className="title">{t('common_sort_by')}</div>
                <div className="sort-content" onClick={() => setListSortOn(!listSortOn)}>
                  <span>{t(sort.title)}</span>
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
                      {t(s.title)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Grid container spacing={2} className="list">
            <Grid item md={3}>
              {category ? <Categories category={category} /> : <h2>{t('product_all')}</h2>}
              <Filter category={category} filter={filter} setFilter={setFilter} />
            </Grid>

            {isLoading ? (
              <Loading />
            ) : (
              <Grid item md={9} className="products">
                <div className="products-container">
                  {productsData.data.length > 0 ? (
                    productsData.data.map((product) => {
                      return <ProductItem key={product.id} product={product} />;
                    })
                  ) : (
                    <div>{t('product_no_item')}</div>
                  )}
                </div>
                {isLoading ? (
                  <Loading />
                ) : (
                  filter.pageSize <= productsData.totalRecords && (
                    <div className="load-more">
                      <button onClick={getProductsMore}>
                        {t('common_load_more')} <KeyboardArrowDown className="icon-down" />
                      </button>
                    </div>
                  )
                )}
              </Grid>
            )}
          </Grid>
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
  );
};

export default ProductList;
