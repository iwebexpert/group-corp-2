const getters = {
    GET_USERS(state) {
        return state.users
    },

    GET_AUTH(state) {
        return state.isAuth
    }
}

export default getters;