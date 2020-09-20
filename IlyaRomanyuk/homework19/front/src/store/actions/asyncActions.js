const asyncActions = {
    async getTasks({ commit }) {
        let response = await fetch('http://localhost:3030');
        let data = await response.json();
        commit('SET_USERS', data);
    },

    async patchTask({ commit }, id) {
        let response = await fetch('http://localhost:3030/todos/' + id, { method: "PATCH" });
        if (response.ok) {
            commit('UPDATE_TASK', id);
        }
    },

    async removeTask({ commit }, id) {
        let response = await fetch('http://localhost:3030/todos/' + id, { method: "DELETE" });
        if (response.ok) {
            commit('DELETE_TASK', id);
        }
    },

    async createTask({ commit }, title) {
        let response = await fetch('http://localhost:3030/todos', {
            method: "POST",
            body: JSON.stringify({ title }),
            headers: {
                'Content-type': 'application/json',
            }
        });

        let data = await response.json();
        commit('CREATE_TASK', data)
    },

    async registerUser({ commit }, info) {
        let response = await fetch('http://localhost:3030/register', {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response.ok) {
            return response
        }
    },

    async authUser({ commit }, info) {
        let response = await fetch('http://localhost:3030/auth', {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                'Content-type': 'application/json',
            }
        });
        let data = await response.json()
        if (!data.message) {
            commit('AUTH', data)
        }
        return data
    }
}

export default asyncActions;