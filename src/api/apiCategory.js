import publicRequest from './configs/publicRequest';

export const categoryApi = {
  getCategories: async (id) => {
    const res = await publicRequest.get('/categories/genderType/' + id);
    return res.data;
  },
};
