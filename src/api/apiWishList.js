import userRequest from './configs/userRequest';

const wishListApi = {
  getMywishList: async () => {
    const res = await userRequest.get('/wishlists/mywishlist');
    return res;
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

export default wishListApi;
