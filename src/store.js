import { createStore } from "vuex" 

const store = createStore({
  state: {
    isLoggedin: false,
    firstname: null,
    surname: null,
    email: null,
    token: null,
    userId: null,
    isAdmin: false
  },
  mutations: {
    storeUser (state, user) {
      state.isLoggedin = true
      state.firstname = user.firstname
      state.surname = user.surname
      state.email = user.email
      state.token = user.token
      state.userId = user.userId
      state.isAdmin = user.isAdmin
    },
    logout (state) {
      state.isLoggedin = false
      state.firstname = null
      state.surname = null
      state.email = null
      state.token = null
      state.userId = null
      state.isAdmin = false
    },
  }

})
export default store