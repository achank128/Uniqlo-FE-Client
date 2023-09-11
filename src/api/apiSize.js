import publicRequest from './configs/publicRequest';

const sizeApi = {
  getSizeByGenderType: async (id) => {
    const res = await publicRequest.get('/sizes/genderType/' + id);
    return res.data;
  },
};

export default sizeApi;
