
export default {
    namespaced:true,
    state() {
        return {
                activeFloor: 1,
                newActiveFloor: 1,
                toggleColor: false,
                isActive: false,
                interval_timer: null,
                vacant: false,
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
        GET_VACANT(state) {
            return state.vacant
        },
        GET_INTERVAL_TIMER(state) {
            return state.interval_timer
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
        },

        SET_VACANT(state, payload) {
            state.vacant = payload
        },


    },
    actions: {

         CHANGE_FLOOR({commit,state},payload) {

             new Promise ((resolve) => {
                 state.interval_timer = setInterval(() => {
                     if (state.activeFloor < payload) {
                         commit('INCREMENT')
                     }
                     else if (state.activeFloor > payload) {
                         commit('DECREMENT')
                     }
                     else if (state.activeFloor === payload) {
                         commit('CLEAR_INTERVAL')
                         return resolve()
                     }
                 },1000)
             })
        }

        // SET_QUEUE({state, commit, rootState}) {
        //     state.firstShaft.interval_timer = setInterval(() => {
        //         if (state.firstShaft.activeFloor < rootState.queue[0]) {
        //             commit('INCREMENT')
        //         } else if (state.firstShaft.activeFloor === state.firstShaft.newActiveFloor) {
        //             commit('CLEAR_INTERVAL')
        //         }
        //
        //         if (state.firstShaft.activeFloor > state.firstShaft.newActiveFloor) {
        //             commit('DECREMENT')
        //         } else if (state.firstShaft.activeFloor === state.firstShaft.newActiveFloor) {
        //             commit('DELETE_TASK', rootState.queue[0], {root: true})
        //             commit('CLEAR_INTERVAL')
        //             setTimeout(() => {
        //                 state.firstShaft.isBusy = false
        //             }, 3000)
        //         }
        //     }, 1000)
        // },

    }
}
