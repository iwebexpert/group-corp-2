const syncActions = {
    session({ commit }, data) {
        commit('SESSION', data)
    },

    endSession({ commit }) {
        commit('END_SESSION')
    }
}

export default syncActions;