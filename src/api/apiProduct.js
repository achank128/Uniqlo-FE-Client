import publicRequest from './configs/publicRequest';

const productApi = {
  filterProducts: async (body) => {
    const res = await publicRequest.post('/products/filter', body);
    return res;
  },
  getProduct: async (id) => {
    const res = await publicRequest.get(`/products/${id}`);
    return res.data;
  },
  getProductDetails: async (id) => {
    const res = await publicRequest.get(`/productdetails/product/${id}`);
    return res.data;
  },
};

export default productApi;
