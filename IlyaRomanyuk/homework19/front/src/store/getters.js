const getters = {
    GET_USERS(state) {
        return state.users
    },

    GET_AUTH(state) {
        return state.isAuth
    },

    GET_DATA(state) {
        return state.data
    }
}

export default getters;