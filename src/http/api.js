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

export const cardUserUpdate = (data) => http.get('/gascard/update', {
  data,
});

export const cardAdd = (data) => http.get('/gascard/add', {
  data,
});

export const meterRead = (data) => http.get('/readmeter/diff', {
  data,
});

export const gasmeterGetAll = () => http.get('/gasmeter/getall');

export const gasmeterGet = (data) => http.get('/gasmeter/get', { data });

export const readRecordGetAll = () => http.get('/meterread/getall');

export const readRecordGet = (data) => http.get('/meterread/get', { data });

export const cardGetById = (data) => http.get('/gascard/get/id', { data });

export const payRead = (data) => http.get('/pay/read', { data });

export const payRecordQuery = (data) => http.get('/pay/read/query', { data });

export const gasTypeAdd = (data) => http.get('/gastype/add', { data });

export const gastypeGetAll = () => http.get('/gastype/getall');

export const gasmeterAdd = (data) => http.get('/gasmeter/add', { data });

export const meterDelete = (data) => http.get('/gasmeter/delete', { data });

export const gasUpdate = (data) => http.get('/gastype/update', { data });

export const gastypeDelete = (data) => http.get('/gastype/delete', { data });

export const userRe = (data) => http.get('/user/re', { data });
export const gasGet = () => fetch('/api/gasGet');
