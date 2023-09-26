<template>
  <div class="elevatorShaft">
    <floor-component
        v-for = "(floor, i) in floors"
        :floor-number=floor
        :key = i
        @call="elevatorCall"
        :is-active="activeFloor === i"
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
      activeFloor: 0
    }
  },
  props: {
    floors: {
      type: Array
    }
  },
  methods: {
    elevatorCall(e) {
      this.activeFloor = this.floors.findIndex(elem => elem === e)
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
