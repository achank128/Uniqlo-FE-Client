import publicRequest from './configs/publicRequest';

const categoryApi = {
  getCategories: async (id) => {
    const res = await publicRequest.get('/categories/genderType/' + id);
    return res.data;
  },
  getCategoryById: async (id) => {
    const res = await publicRequest.get('/categories/' + id);
    return res.data;
  },
};

export default categoryApi;
