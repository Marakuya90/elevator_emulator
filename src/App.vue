<template>
  <div class="main">
    <elevator-shaft
        v-for="el in GET_ELEVATORS"
        :key="`elev-${el}`">
    </elevator-shaft>
    <div class="buttons">
      <button
          v-for="(button, i) in GET_FLOORS"
          :key="`btn-${i}`"
          class="buttonDefault"
          @click="action(button)">
        {{ button }}
        <div
            :class="button === GET_NEW_ACTIVE_FLOOR & !GET_VACANT ? 'colorBlink' : null"
            class="circle">
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ElevatorShaft from "@/components/ElevatorShaft.vue";
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {ElevatorShaft},
  data() {
    return {
      queue: []
    }
  },
  computed: {
    ...mapGetters('firstElevator', ['GET_ACTIVE_FLOOR', 'GET_NEW_ACTIVE_FLOOR', "GET_VACANT"]),
    ...mapGetters(['GET_ELEVATORS', 'GET_FLOORS', 'GET_QUEUE']),

    // action() {
    //   return this.createQueue((button) => this.CHANGE_FLOOR(button))
    // },
    action() {
      return this.createQueue((floor) => {
        return new Promise((resolve) => {
          let interval = setInterval(() => {
            if (this.GET_ACTIVE_FLOOR < floor) {
              this.INCREMENT()
            } else if (this.GET_ACTIVE_FLOOR > floor) {
              this.DECREMENT()
            } else if (this.GET_ACTIVE_FLOOR === floor) {
              clearInterval(interval)
              return resolve()
            }
          }, 1000)
        })
      })
    },
  },
  methods: {
    ...mapMutations(['SHIFT_QUEUE', 'PUSH_QUEUE']),
    ...mapMutations('firstElevator', ['INCREMENT', 'DECREMENT', 'CLEAR_INTERVAL', 'SET_NEW_ACTIVE_FLOOR', 'SET_VACANT']),
    ...mapActions('firstElevator', ['CHANGE_FLOOR']),
    ...mapActions(['GET_SHIFT_VALUE']),

    createQueue(func) {
      // const queue = []
      let vacant = false
      const start = () => {
        if (!vacant) vacant = true
        const values = this.queue.shift()

        func(...values).then(() => {
          vacant = false
          if (this.queue.length) start()
        })
      }

      return (...params) => {
        console.log(...params)
        this.queue.push(params)
        if (!vacant) start()
      }
    }

    // elevatorCall(e) {
    //   if (!this.GET_QUEUE.includes(e) || this.GET_ACTIVE_FLOOR !== e)
    //     this.ADD_TASK(e)
    // }
  }
  // watch: {
  //   queue: {
  //     handler(val, oldVal) {
  //       if (val.length > oldVal.length) {
  //         let a = true
  //         val.splice(0, val.length - oldVal.length)
  //         let floor = val[0]
  //         while (a) {
  //           if (!this.IS_BUSY) {
  //             this.CHANGE_FLOOR(floor)
  //             a = false
  //             let index = this.queue.findIndex((elem) => elem === floor)
  //             this.queue.splice(index, 1)
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  gap: 30px;
}

.buttons {
  display: flex;
  flex-direction: column-reverse;
  height: 999.96px;
  justify-content: center;
  gap: 136px;
}

.buttonDefault {
  display: flex;
  gap: 5px;
  font-size: 20px;
  border: none;
  width: 100px;
  height: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .circle {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    border: 1px solid black;
    background-color: green;
  }

  &:hover {
    box-shadow: 10px 5px 5px rgba(174, 197, 227, 0.47);
  }

  .colorBlink {
    animation: colorBlink 0.5s infinite;
    animation-timing-function: ease-out;
  }

  @keyframes colorBlink {
    from {
      background-color: green;
    }
    to {
      background-color: red;
    }
  }
}
</style>
