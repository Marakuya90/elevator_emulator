<template>
<div class="floor">
  <div class="elevatorСabin">
    <div class="scoreboard">
      <span></span>
      <span>{{ targetFloor }}</span>
    </div>
  </div>
  <button class="buttonDefault">{{ floorNumber }}</button>
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
    }
  }
}
</script>

<style scoped lang="scss">
.floor {
  display: flex;
  gap:20px;
  .elevatorСabin {
    width: 250px;
    height: 200px;
    background-color: #282828;
    display: flex;
    align-items: center;
    justify-content: center;
    .scoreboard {
      width: 100px;
      height: 70px;
      background-color: #f8f8f8;
    }
  }
  .buttonDefault {
    border: none;
    width: 100px;
    height: 30px;
    align-self: center;
  }
}
</style>
