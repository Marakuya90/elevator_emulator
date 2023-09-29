
export default {
    namespaced:true,
    state() {
        return {
            firstShaft: {
                floors: [1, 2, 3, 4, 5],
                activeFloor: 1,
                newActiveFloor: 1,
                toggleColor: false,
                isActive: false,
                interval_timer: [],
                direction: null
            }
        }
    },
    getters: {
        FLOORS(state) {
            return state.firstShaft.floors
        },
        ACTIVE_FLOOR(state) {
            return state.firstShaft.activeFloor
        },
        NEW_ACTIVE_FLOOR(state) {
            return state.firstShaft.newActiveFloor
        },
        DIRECTION(state) {
            return state.firstShaft.direction
        },
        TOGGLE_COLOR(state) {
            return state.firstShaft.toggleColor
        }
    },
    mutations: {
        INCREMENT(state) {
            state.firstShaft.direction = 'up'
            state.firstShaft.activeFloor++
        },

        DECREMENT(state) {
            state.firstShaft.direction = 'down'
            state.firstShaft.activeFloor--
        },

        CLEAR_INTERVAL(state) {
            clearInterval(state.firstShaft.interval_timer)
            state.firstShaft.direction = null
        },

        SET_NEW_ACTIVE_FLOOR(state, payload) {
            state.firstShaft.newActiveFloor = payload
        },

        SET_TOGGLE_COLOR(state) {
            state.firstShaft.toggleColor = true
        }
    },
    actions: {

        CHANGE_FLOOR({commit,state}) {

                state.firstShaft.interval_timer = setInterval(() => {
                if (state.firstShaft.activeFloor < state.firstShaft.newActiveFloor) {
                    state.firstShaft.toggleColor = true
                    commit('INCREMENT')
                }
                else if (state.firstShaft.activeFloor > state.firstShaft.newActiveFloor) {
                    state.firstShaft.toggleColor = true
                    commit('DECREMENT')
                }
                else if (state.firstShaft.activeFloor === state.firstShaft.newActiveFloor) {
                    state.firstShaft.toggleColor = false
                    commit('CLEAR_INTERVAL')
                }
            },1000)
        }
    }
}
