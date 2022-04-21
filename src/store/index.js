import { createStore } from 'vuex';

const store = createStore({
  state: {
    currentUser: null, // 当前用户
    userName: '',
    name: '',
    isLogin: false, // 用户是否已经登陆
    token: '', // 保存用户登录的token
  },
  getters: {
  },
  mutations: {
    setUsername: (state, data) => { state.userName = data; },
    setCurrentUser: (state, data) => { state.currentUser = data; },
    setName: (state, data) => { state.name = data; },
  },
});
export default store;
