import publicRequest from './configs/publicRequest';

const regionApi = {
  getProvinces: async () => {
    const res = await publicRequest.get('/regions/provinces/all');
    return res.data;
  },
  getDistricts: async (provinceCode) => {
    const res = await publicRequest.get('/regions/districts', {
      params: {
        provinceCode,
      },
    });
    return res.data;
  },
  getWards: async (districtCode) => {
    const res = await publicRequest.get('/regions/wards', {
      params: {
        districtCode,
      },
    });
    return res.data;
  },
};

export default regionApi;
