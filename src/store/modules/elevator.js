export default {
    namespaced: true,
    state() {
        return {
            activeFloor: 1,
            newActiveFloor: null,
            isActive: false,
            pending: false,
            direction: null,
            isBusy: false
        }
    },
    getters: {
        GET_ACTIVE_FLOOR(state) {
            return state.activeFloor
        },
        GET_NEW_ACTIVE_FLOOR(state) {
            return state.newActiveFloor
        },
        GET_DIRECTION(state) {
            return state.direction
        },
        GET_PENDING(state) {
            return state.pending
        }
    },
    mutations: {
        INCREMENT(state) {
            state.direction = 'up'
            state.activeFloor++
        },
        DECREMENT(state) {
            state.direction = 'down'
            state.activeFloor--
        },
        SET_ACTIVE_FLOOR(state, payload) {
            state.activeFloor = payload
        },
        SET_NEW_ACTIVE_FLOOR(state, payload) {
            state.newActiveFloor = payload
        },
        SET_PENDING(state, payload) {
            state.pending = payload
        }
    }
}
