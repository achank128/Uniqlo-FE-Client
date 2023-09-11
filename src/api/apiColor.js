import publicRequest from './configs/publicRequest';

const colorApi = {
  getColors: async () => {
    const res = await publicRequest.get('/colors');
    return res.data;
  },
};

export default colorApi;
