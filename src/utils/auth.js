export const isUserLoggedIn = () => {
  return localStorage.getItem('userData') && localStorage.getItem('accessToken');
};
export const getUserData = () => JSON.parse(localStorage.getItem('userData'));
export const getAccessToken = async () => {
  var token = localStorage.getItem('accessToken');
  return token;
};
