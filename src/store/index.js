import { createStore, createLogger } from 'vuex'
import elevator from "@/store/modules/elevator";
export default createStore( {
    plugins:[createLogger()],
    modules: {
        firstElevator: elevator
    },
    state() {
        return {
            queue: [],
        }
    },
    getters: {
        GET_QUEUE(state) {
            return state.queue
        }
    },
    mutations: {
        ADD_TASK(state,payload){
            state.queue.push(payload)
            console.log(state.queue)
        }
    },
    actions: {
        // CHANGE_FLOOR(context) {
        //     console.log(context)
        // }
    }
})
