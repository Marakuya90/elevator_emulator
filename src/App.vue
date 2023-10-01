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
          @click="elevatorCall(button)">
        {{ button }}
        <div
            :class="button === GET_NEW_ACTIVE_FLOOR & GET_IS_BUSY ? 'colorBlink' : null"
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
  computed: {
    ...mapGetters('firstElevator', ['GET_ACTIVE_FLOOR', 'GET_NEW_ACTIVE_FLOOR', "GET_IS_BUSY"]),
    ...mapGetters(['GET_ELEVATORS', 'GET_FLOORS', 'GET_QUEUE']),

    // elevatorCall() {
    //   return this.createQueue((e) => {
    //     console.log("start", e);
    //     return new Promise((resolve) => {
    //       this.CHANGE_FLOOR(e)
    //       setTimeout(() => {
    //         this.ADD_TASK(e);
    //         console.log("end", e);
    //         resolve();
    //       }, 1000);
    //     });
    //   });
    // },
    changeFloorUp(toFloorPX) {
      return createQueue((resolve) => {
        let floor = this.bottom;

        if (this.bottom < toFloorPX) {
          let timerUp = setInterval(() => {
            this.up = true;

            if (this.bottom !== toFloorPX) {
              floor += 2;
            } else if (this.bottom === toFloorPX) {
              this.up = false;
              clearInterval(timerUp);
              this.bottom = floor;
              return resolve();
            }

            this.bottom = floor;
          }, 20);
        } else if (this.bottom > toFloorPX) {
          let timerDown = setInterval(() => {
            this.down = true;

            if (this.bottom !== toFloorPX) {
              floor -= 2;
            } else if (this.bottom === toFloorPX) {
              this.down = false;
              clearInterval(timerDown);
              this.bottom = floor;
              return resolve();
            }

            this.bottom = floor;
          }, 20);
        }
      });
    },
  },
  methods: {
    ...mapMutations(['ADD_TASK']),
    ...mapMutations('firstElevator', ['INCREMENT', 'DECREMENT', 'CLEAR_INTERVAL', 'SET_NEW_ACTIVE_FLOOR']),
    ...mapActions('firstElevator', ['CHANGE_FLOOR']),

    createQueue(foo) {
      const queue = []
      this.GET_IS_BUSY = true;

      const start = () => {
        if (!this.GET_IS_BUSY) this.GET_IS_BUSY = false
        const params = queue.shift()

        foo(...params).then(() => {
          this.GET_IS_BUSY = true;
          if (queue.length) start()
        })
      }

      return (...params) => {
        queue.push(params)

        if (!this.GET_IS_BUSY) start()
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
