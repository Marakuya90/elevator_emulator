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
            floors: [1, 2, 3, 4, 5],
            elevators: [1]
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
        ADD_TASK (state, payload) {
            state.queue.push(payload)
        }

    }
})
