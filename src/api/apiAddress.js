import userRequest from './configs/userRequest';

const addressApi = {
  getMyAddress: async () => {
    const res = await userRequest.get('/userAddresses/myaddress');
    return res.data;
  },
  createAddress: async (body) => {
    const res = await userRequest.post('/userAddresses', body);
    return res;
  },
  updateAddress: async (body) => {
    const res = await userRequest.put('/userAddresses', body);
    return res;
  },
  deleteAddress: async (id) => {
    const res = await userRequest.delete('/userAddresses/' + id);
    return res;
  },
};

export default addressApi;
