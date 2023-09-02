import publicRequest from './configs/publicRequest';

export const genderTypeApi = {
  getGenderTypes: async (id) => {
    const res = await publicRequest.get('/genderTypes');
    return res.data;
  },
};
