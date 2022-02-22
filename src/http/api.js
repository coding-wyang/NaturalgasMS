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

export const userUpdate = (data) => http.get('/user/update', {
  data,
});

export const userDelete = (data) => http.get('/user/delete', {
  data,
});

export const userAdd = (data) => http.get('/user/add', {
  data,
});

export const gascardGet = (data) => http.get('/gascard', {
  data,
});

export const cardQuery = (data) => http.get('/gascard/query', {
  data,
});

export const cardDelete = (data) => http.get('/gascard/delete', {
  data,
});

export const gasGet = () => fetch('/api/gasGet');
