<template>
  <div class="elevatorShaft">
    <div
      class="floor"
      v-for="(i) in FLOORS"
      :key = i>
      <floor-component :is-active="this.ACTIVE_FLOOR === i">
      </floor-component>
    </div>
  </div>
</template>

<script>
import FloorComponent from "@/components/FloorComponent.vue";
import {mapGetters} from "vuex";

export default {
  name: "ElevatorShaft",
  components: {FloorComponent},
  computed: {
    ...mapGetters('firstElevator',['FLOORS','ACTIVE_FLOOR']),
  }
}
</script>

<style scoped lang="scss">
  .elevatorShaft {
    display: flex;
    flex-direction: column-reverse;
    .floor {
      display: flex;
      gap:20px;}
  }
</style>
