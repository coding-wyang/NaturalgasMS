import http from './index';
/* 登录信息 */
export const loginGet = (data) => http.get('/user/login', {
  data,
});

export const userInfoGet = (data) => http.get('/user/info', {
  data,
});

export const monitorPost = (data) => http.get('/monitor', {
  data,
});

export const gasGet = () => fetch('/api/gasGet');
