<template>
  <div class="elevatorShaft">
    <floor-component
        v-for = "(floor, i) in floors"
        :floor-number=floor
        :key = i
        @call="elevatorCall"
        :is-active="activeFloor === i"
        :direction = isUp
        :target-floor = newActiveFloor
    ></floor-component>
  </div>
</template>

<script>
import FloorComponent from "@/components/FloorComponent.vue";

export default {
  name: "ElevatorShaft",
  components: {FloorComponent},
  data() {
    return {
      activeFloor: 0,
      newActiveFloor: 0,
      isUp: true
    }
  },
  props: {
    floors: {
      type: Array
    }
  },

  methods: {
    elevatorCall(e) {
      this.newActiveFloor = e
      const callFloor = this.floors.findIndex(elem => elem === e)
      let changeInterval
        changeInterval = setInterval(() => {
          if (this.activeFloor < callFloor) {
            this.activeFloor++
            this.isUp = true
          }
          if (this.activeFloor > callFloor) {
            this.activeFloor--
            this.isUp = false
          }
          if (this.activeFloor === callFloor) {

          clearTimeout(changeInterval)
        }
      },1000)
    }
  }
}
</script>

<style scoped lang="scss">
  .elevatorShaft {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
