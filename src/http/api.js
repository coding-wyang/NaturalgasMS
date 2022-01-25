import http from "./index.js";
/* 登录信息 */
export const loginGet = (data) => {
  return http.get("/user/login", {
    data: data,
  });
};