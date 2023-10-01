<template>
<div class="floor">
    <div class="elevatorСabin" :class="isActive ? 'active': null" >
      <div class="scoreboard" v-if=isActive>
        <div v-if="GET_DIRECTION != null">
          <i v-if="GET_DIRECTION === 'up'" class='bi bi-arrow-up-circle'></i>
          <i v-else class='bi bi-arrow-down-circle'></i>
        </div>
        <span>{{ GET_NEW_ACTIVE_FLOOR }}</span>
      </div>
    </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "FloorComponent",
  props: {
    isActive: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters('firstElevator',['GET_NEW_ACTIVE_FLOOR','GET_DIRECTION']),
  }
}
</script>

<style scoped lang="scss">

  .elevatorСabin {
    width: 250px;
    height: 200px;
    background-color: rgba(174, 197, 227, 0.47);
    display: flex;
    align-items: center;
    justify-content: center;
    .scoreboard {
      width: 100px;
      height: 70px;
      background-color: #f8f8f8;
      color: cornflowerblue;
      font-size: 27px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap:7px
    }
  }
  .active {
    animation: blink 1s 1;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    background-color: #3587D7FF;
  }
  @keyframes blink {
    from {
      background-color: rgba(174, 197, 227, 0.47);
    }
    to {
      background-color: #3587D7A9;
    }
  }
</style>
