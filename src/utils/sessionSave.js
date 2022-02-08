function sessionSave(store) {
  if (sessionStorage.getItem('store')) {
    store.replaceState({
      ...store.state,
      ...JSON.parse(sessionStorage.getItem('store')),
    });
  }
  // 在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', JSON.stringify(store.state));
  });
}

export default sessionSave;
