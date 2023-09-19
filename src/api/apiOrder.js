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
  updateStatusOrder: async (body) => {
    const res = await userRequest.put('/orders/status', body);
    return res;
  },
};

export default orderApi;
