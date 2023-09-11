import userRequest from './configs/userRequest';

const orderApi = {
  getMyOrders: async () => {
    const res = await userRequest.get('/orders/myorders');
    return res.data;
  },
  createOrder: async (body) => {
    const res = await userRequest.post('/orders/createfull', body);
    return res;
  },
  cancelOrder: async (body) => {
    const res = await userRequest.put('/orders/cancel', body);
    return res;
  },
};

export default orderApi;
