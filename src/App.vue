<template>
  <div class="main">
    <elevator-shaft>
    </elevator-shaft>
  <div class="buttons">
    <button
        v-for="(button, i) in FLOORS"
        :key = i
        class="buttonDefault"
        @click="elevatorCall(button)">
        {{ button }}
      <div
          :class="button === NEW_ACTIVE_FLOOR & TOGGLE_COLOR ? 'colorBlink' : null"
          class="circle">
      </div>
    </button>
  </div>
  </div>
</template>

<script >
import ElevatorShaft from "@/components/ElevatorShaft.vue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {ElevatorShaft},
  computed: {
    ...mapGetters('firstElevator',['FLOORS','ACTIVE_FLOOR','NEW_ACTIVE_FLOOR','TOGGLE_COLOR']),
  },
  methods: {
    ...mapMutations('firstElevator',['INCREMENT','DECREMENT','CLEAR_INTERVAL','SET_NEW_ACTIVE_FLOOR','SET_TOGGLE_COLOR']),
    ...mapActions('firstElevator',['CHANGE_FLOOR']),
    elevatorCall(e) {
      this.SET_NEW_ACTIVE_FLOOR(e)
      this.CHANGE_FLOOR()
    }
  },
  updated() {
    if (this.ACTIVE_FLOOR !== this.NEW_ACTIVE_FLOOR) {
      this.SET_TOGGLE_COLOR()
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
