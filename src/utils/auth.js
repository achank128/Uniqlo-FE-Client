export const isUserLoggedIn = () => {
  return localStorage.getItem('userData') && localStorage.getItem('accessToken');
};
export const getUserData = () => JSON.parse(localStorage.getItem('userData'));
export const getUserAccessToken = () => localStorage.getItem('accessToken');
