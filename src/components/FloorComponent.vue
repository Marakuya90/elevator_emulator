<template>
<div class="floor">
  <div class="elevatorСabin" :class="isActive ? 'active': null" >
    <div class="scoreboard">
      <div v-if="direction">
        <i :class="direction ? 'bi bi-arrow-up-circle': 'bi bi-arrow-down-circle'"></i>
      </div>
      <span v-if=isActive >{{ targetFloor }}</span>
    </div>
  </div>
  <button
      class="buttonDefault"
      @click="$emit('call',floorNumber)"
  >
    {{ floorNumber }}
    <div class="circle"></div>
  </button>
</div>
</template>

<script>
export default {
  name: "FloorComponent",
  props: {
    floorNumber: {
      type: Number,
      required: true
    },
    targetFloor: {
      type: Number
    },
    isActive: {
      type: Boolean
    },
    direction: {
      type: Boolean
    }
  },
  emits: ['call']
}
</script>

<style scoped lang="scss">
.floor {
  display: flex;
  gap:20px;

  .elevatorСabin {
    border: 1px solid gray;
    width: 250px;
    height: 200px;
    background-color: rgba(192, 180, 180, 0.98);
    display: flex;
    align-items: center;
    justify-content: center;

    .scoreboard {
      width: 100px;
      height: 70px;
      background-color: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
  }
  .active {
    background-color: #2c3e50;
  }
}
</style>
