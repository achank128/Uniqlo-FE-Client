import userRequest from './configs/userRequest';

const reviewApi = {
  getReivewsProduct: async (body) => {
    const res = await userRequest.post('/reviews/filter', body);
    return res;
  },
  addReview: async (body) => {
    const res = await userRequest.post('/reviews', body);
    return res;
  },
};

export default reviewApi;
