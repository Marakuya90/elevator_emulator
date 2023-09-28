import { createStore } from 'vuex'

export default createStore({
    state: {
        firstShaft: {
            floors: [1, 2, 3, 4, 5],
            activeFloor: 1,
            newActiveFloor: 0,
            toggleColor: false,
            isActive: false
        }
    },
    getters: {
        FLOORS(state){
            return state.firstShaft.floors
        },
        ACTIVE_FLOOR(state){
            return state.firstShaft.activeFloor
        },
        NEW_ACTIVE_FLOOR(state){
            return state.firstShaft.newActiveFloor
        }
    },
    mutations: {
        INCREMENT (state) {
            state.activeFloor++;
        },
        DECREMENT (state) {
            state.activeFloor--;
        }
    },
    actions: {
    }
})
