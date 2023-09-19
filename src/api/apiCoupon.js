import userRequest from './configs/userRequest';

const couponApi = {
  getMyCoupon: async () => {
    const res = await userRequest.get('/coupons/mycoupon');
    return res.data;
  },
  addCoupon: async (code) => {
    const res = await userRequest.post('/usercoupons/add/' + code);
    return res;
  },
};

export default couponApi;
