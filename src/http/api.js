import http from './index';
/* 登录信息 */
export const loginGet = (data) => http.get('/user/login', {
  data,
});
