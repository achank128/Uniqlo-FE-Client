import userRequest from './configs/userRequest';

const couponApi = {
  getMyCoupon: async () => {
    const res = await userRequest.get('/coupons/mycoupon');
    return res.data;
  },
  addWishList: async (productId) => {
    const res = await userRequest.post('/wishlists/add/' + productId);
    return res;
  },
  removeWishList: async (id) => {
    const res = await userRequest.delete('/wishlists/' + id);
    return res;
  },
};

export default couponApi;
