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

    DELETE_TASK(state, id) {
        state.users = state.users.filter(el => el._id != id)
    },

    CREATE_TASK(state, task) {
        state.users.push(task)
    }
}

export default mutations;