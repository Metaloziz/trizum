import axios, { AxiosRequestConfig } from 'axios';

import TokenService from 'app/services/tokenService';
import { BASE_URL } from 'constants/constants';

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig<{ headers: { 'Content-Type': string } }>) => {
    const token = TokenService.getLocalAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    console.log(error, 'error');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => {
    const token = res.headers.authorization;
    if (token) {
      TokenService.updateLocalAccessToken(token);
    }
    return res;
  },
  rej => {
    console.log(rej, 'rej');
    return rej;
  },
);
// instance.interceptors.response.use(
//   res => {
//     console.log(res?.headers, 'headers');
//     const token = res.headers.authorization;
//     if (token) {
//       TokenService.updateLocalAccessToken(token);
//     }
//     return res;
//   },
//   rej => {
//     console.log(rej, 'rej');
//     return rej;
//   },
// );
// instance.interceptors.response.use(
//   res => res,
//   async err => {
//     const originalConfig = err.config;
//     if (
//       // originalConfig.url !== '/auth/signin' &&
//       err.response
//     ) {
//       // Access Token was expired
//       // if (err.response.status === 401 && !originalConfig._retry) {
//       //   originalConfig._retry = true;
//       //   try {
//       //     const rs = await instance.post('/auth/refreshtoken', {
//       //       refreshToken: TokenService.getLocalRefreshToken(),
//       //     });
//       //     const { accessToken } = rs.data;
//       //     TokenService.updateLocalAccessToken(accessToken);
//       //     return instance(originalConfig);
//       //   } catch (_error) {
//       //     return Promise.reject(_error);
//       //   }
//       // }
//     }
//     return Promise.reject(err);
//   },
// );
export default instance;
