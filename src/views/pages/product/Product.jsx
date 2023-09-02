import React, { useEffect, useState } from 'react';
import './product.scss';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../../api/apiProduct';
//components
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import ProductContent from './productContent/ProductContent';
import { ProductData } from '../../../utils/data';

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  useEffect(() => {
    // const apiProduct = async () => {
    //   try {
    //     setError(false);
    //     const product = await getSingleProduct(id);
    //     setProductData(product);
    //   } catch (err) {
    //     setError(true);
    //   }
    // };
    // apiProduct();
    setProductData(ProductData);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {productData ? (
        <ProductContent productData={productData} />
      ) : (
        <div id="loading-container">
          <Loading />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Product;
