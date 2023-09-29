import { createStore, createLogger } from 'vuex'
import elevator from "@/store/modules/elevator";
export default createStore( {
    plugins:[createLogger()],
    modules: {
        firstElevator: elevator
    },
    state() {
        return {
        }
    },
    getters: {

    }
})
