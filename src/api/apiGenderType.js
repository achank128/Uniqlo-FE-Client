import publicRequest from './configs/publicRequest';
const genderTypeApi = {
  getGenderTypes: async () => {
    const res = await publicRequest.get('/genderTypes');
    return res.data;
  },
  getGenderTypeById: async (id) => {
    const res = await publicRequest.get('/genderTypes/' + id);
    return res.data;
  },
};

export default genderTypeApi;
