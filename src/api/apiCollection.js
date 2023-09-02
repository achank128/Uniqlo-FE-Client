import publicRequest from './configs/publicRequest';

export const collectionApi = {
  getCollections: async () => {
    const res = await publicRequest.get('/collections/show');
    return res.data;
  },
};
