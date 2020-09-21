const mutations = {
    SET_USERS(state, data) {
        state.users = data;
    },

    UPDATE_TASK(state, id) {
        state.users.forEach(el => {
            if (el._id == id) {
                el.completed = !el.completed;
            }
        })
    },

    SESSION(state, data) {
        state.data = data
        state.isAuth = true
    },

    END_SESSION(state) {
        state.data = null
        state.isAuth = false
    },

    AUTH(state, data) {
        state.data = data
        state.isAuth = !state.isAuth
        localStorage.setItem('data', JSON.stringify(state.data))
    },

    DELETE_TASK(state, id) {
        state.users = state.users.filter(el => el._id != id)
    },

    CREATE_TASK(state, task) {
        state.users.push(task)
    }
}

export default mutations;