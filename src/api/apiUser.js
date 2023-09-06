import userRequest from './configs/userRequest';

const userApi = {
  getMe: async () => {
    const res = await userRequest.get('/users/getme');
    return res;
  },
};

export default userApi;
