import userRequest from './configs/userRequest';

const cartApi = {
  getMyCart: async () => {
    const res = await userRequest.get('/carts/mycart');
    return res;
  },
  addCartItem: async (body) => {
    const res = await userRequest.post('/cartitems', body);
    return res;
  },
  updateQuantityCartItem: async (body) => {
    const res = await userRequest.put('/cartitems/quantity', body);
    return res;
  },
  removeCartItem: async (id) => {
    const res = await userRequest.delete('/cartitems/' + id);
    return res;
  },
};

export default cartApi;
