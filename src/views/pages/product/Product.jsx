import React, { useEffect, useState } from 'react';
import './product.scss';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../../api/apiProduct';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
//components
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import ProductContent from './productContent/ProductContent';
import { ProductData } from '../../../utils/data';

const Product = ({ showToast }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [error, setError] = useState(false);
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

  if (error) return <div>Something went wrong...</div>;
  return (
    <>
      <Navbar />
      {productData ? (
        <ProductContent productData={productData} showToast={showToast} />
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
