
export default {
    namespaced:true,
    state() {
        return {
                activeFloor: 1,
                newActiveFloor: 1,
                toggleColor: false,
                isActive: false,
                interval_timer: [],
                isBusy: false,
                direction: null
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
        GET_IS_BUSY(state) {
            return state.isBusy
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

        CLEAR_INTERVAL(state) {
            clearInterval(state.interval_timer)
            state.direction = null
        },

        SET_NEW_ACTIVE_FLOOR(state, payload) {
            state.newActiveFloor = payload
        }
    },
    actions: {

        CHANGE_FLOOR({commit,state},payload) {

                state.interval_timer = setInterval(() => {
                if (state.activeFloor < payload) {
                    commit('INCREMENT')
                }
                else if (state.activeFloor > payload) {
                    commit('DECREMENT')
                }
                else if (state.activeFloor === payload) {
                    commit('CLEAR_INTERVAL')
                }
            },1000)
        }
    }
}
