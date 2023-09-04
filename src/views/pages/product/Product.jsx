import React, { useEffect, useState } from 'react';
import './product.scss';
import { useParams } from 'react-router-dom';
//components
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import ProductContent from './productContent/ProductContent';
import productApi from '../../../api/apiProduct';
import { useQuery } from 'react-query';

const Product = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: product,
  } = useQuery(['product', id], ({ queryKey }) => productApi.getProduct(queryKey[1]));

  const { isLoading: isLoadingPD, data: productDetails } = useQuery(
    ['productDetails', id],
    ({ queryKey }) => productApi.getProductDetails(queryKey[1]),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) return <div>Something went wrong...</div>;

  return (
    <>
      {isLoading && isLoadingPD ? (
        <div id="loading-container">
          <Loading />
        </div>
      ) : (
        <ProductContent product={product} productDetails={productDetails} />
      )}
      <Footer />
    </>
  );
};

export default Product;
