import publicRequest from './configs/publicRequest';

const collectionApi = {
  getCollections: async () => {
    const res = await publicRequest.get('/collections/show');
    return res.data;
  },
  getCollectionById: async (id) => {
    const res = await publicRequest.get('/collections/' + id);
    return res.data;
  },
};
export default collectionApi;
