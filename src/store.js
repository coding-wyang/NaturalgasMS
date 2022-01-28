import { createStore } from 'vuex';

const store = createStore({
  state: {
    currentUser: null, // 当前用户
    isLogin: false, // 用户是否已经登陆
    token: '', // 保存用户登录的token
  },
  getters: {
  },
  mutations: {

  },
});

export default store;
