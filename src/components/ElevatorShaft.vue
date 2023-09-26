<template>
  <div class="elevatorShaft">
    <floor-component
        v-for = "(floor, i) in floors"
        :floor-number=floor
        :key = i
    ></floor-component>
  </div>
</template>

<script>
import FloorComponent from "@/components/FloorComponent.vue";

export default {
  name: "ElevatorShaft",
  components: {FloorComponent},
  props: {
    floors: {
      type: Array
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
