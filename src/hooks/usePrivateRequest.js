import { useEffect } from 'react';
// import useRefreshToken from './useRefreshToken';
import { useSelector } from 'react-redux';
import { accessTokenSelector, userSelector } from '../redux/slices/authSlice';
import userRequest from '../api/configs/userRequest';

const useAxiosPrivate = () => {
  //const refresh = useRefreshToken();
  const user = useSelector(userSelector);
  const accessToken = useSelector(accessTokenSelector);

  useEffect(() => {
    const requestIntercept = userRequest.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // const responseIntercept = userRequest.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 403 && !prevRequest?.sent) {
    //       prevRequest.sent = true;
    //       const newAccessToken = await refresh();
    //       prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
    //       return userRequest(prevRequest);
    //     }
    //     return Promise.reject(error);
    //   },
    // );

    return () => {
      userRequest.interceptors.request.eject(requestIntercept);
      //userRequest.interceptors.response.eject(responseIntercept);
    };
  }, [user, accessToken]);

  return userRequest;
};

export default useAxiosPrivate;
