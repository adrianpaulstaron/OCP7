import { createStore } from "vuex" 

const store = createStore({
   state: {
      isLoggedin: false,
      firstname: null,
      surname: null,
      email: null,
      token: null
   },
   mutations: {
    login (state, user) {
      // muter l'état
      state.isLoggedin = true
      state.firstname = user.firstname
      state.surname = user.surname
      state.email = user.email
      state.token = user.token
    },
    logout (state) {
        // muter l'état
        state.isLoggedin = false
        state.firstname = null
        state.surname = null
        state.email = null
        state.token = null
    },
  }

})
export default store