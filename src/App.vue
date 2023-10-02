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
          @click="elevatorCall(button)"
          :disabled="GET_PENDING">
        {{ button }}
        <div
            :class="[GET_PENDING ? 'queue': '',
            button === this.GET_NEW_ACTIVE_FLOOR && button !== this.GET_ACTIVE_FLOOR? 'colorBlink':'']"
            class="circle">
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ElevatorShaft from "@/components/ElevatorShaft.vue";
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {ElevatorShaft},
  data() {
    return {
      queue: []
    }
  },
  methods: {
    ...mapMutations('firstElevator', ['INCREMENT', 'DECREMENT', 'SET_NEW_ACTIVE_FLOOR', 'SET_PENDING', 'SET_ACTIVE_FLOOR']),

    createQueue(func) {
      let vacant = false
      const start = () => {
        if (!vacant) vacant = true
        const values = this.queue.shift()
        func(...values).then(() => {
          this.SET_PENDING(true)
          setTimeout(() => {
            vacant = false
            this.SET_PENDING(false)
          }, 3000)
          if (this.queue.length) start()
        })
      }
      return (...params) => {
        this.queue.push(params)
        if (!vacant) start()
      }
    }
  },
  computed: {
    ...mapGetters('firstElevator', ['GET_ACTIVE_FLOOR', 'GET_NEW_ACTIVE_FLOOR', 'GET_PENDING']),
    ...mapGetters(['GET_ELEVATORS', 'GET_FLOORS']),

    elevatorCall() {
      return this.createQueue((floor) => {
        return new Promise((resolve) => {
          let interval = setInterval(() => {
            this.SET_NEW_ACTIVE_FLOOR(floor)
            if (this.GET_ACTIVE_FLOOR < floor) {
              this.INCREMENT()
            } else if (this.GET_ACTIVE_FLOOR > floor) {
              this.DECREMENT()
            } else if (this.GET_ACTIVE_FLOOR === floor) {
              this.SET_ACTIVE_FLOOR(this.GET_NEW_ACTIVE_FLOOR)
              clearInterval(interval)
              return resolve()
            }
          }, 1000)
        })
      })
    }
  }
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
  gap: 7px;
  font-size: 22px;
  font-weight: bold;
  border: none;
  width: 100px;
  height: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: green;
    box-shadow: 0 0 10px 2px rgba(255, 255, 0, .7);
  }

  &:hover {
    box-shadow: 10px 5px 5px rgba(174, 197, 227, 0.47);
  }

  .colorBlink {
    animation: colorBlink 0.5s infinite;
    animation-timing-function: ease-out;
  }

  .queue {
    animation: queue 0.5s infinite;
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

  @keyframes queue {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      background-color: yellow;
    }
  }
}
</style>
