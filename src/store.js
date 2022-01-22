import {createStore} from 'vuex'
const store = createStore({
  state: {
    todos: [
      { id: 1, title: '...', done: true }
    ]
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})

export default store;