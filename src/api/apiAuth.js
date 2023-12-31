import publicRequest from './configs/publicRequest';

const authApi = {
  login: async (body) => {
    const res = await publicRequest.post('/auth/login', body);
    return res;
  },
  register: async (body) => {
    const res = await publicRequest.post('/auth/register', body);
    return res;
  },
};

export default authApi;
