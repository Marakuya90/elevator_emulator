import {createStore, createLogger} from 'vuex'
import elevator from "@/store/modules/elevator";

export default createStore({
    plugins: [createLogger()],
    modules: {
        firstElevator: elevator
    },
    state() {
        return {
            queue: [],
            floors: 5,
            elevators: 3
        }
    },
    getters: {
        GET_QUEUE(state) {
            return state.queue
        },
        GET_FLOORS(state) {
            return state.floors
        },
        GET_ELEVATORS(state) {
            return state.elevators
        }

    },

    mutations: {
        PUSH_QUEUE(state, payload) {
            state.queue.push(payload)
        },

        SHIFT_QUEUE(state) {
            state.queue.shift()
        }
    },

    actions: {
        GET_SHIFT_VALUE({commit}) {
            return commit('SHIFT_QUEUE')
        }
    }
})
