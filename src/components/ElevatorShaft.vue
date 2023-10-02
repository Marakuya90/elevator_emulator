<template>
  <div class="elevatorShaft">
    <div
        class="floor"
        v-for="(i) in GET_FLOORS"
        :key=i>
      <floor-component :is-active="this.GET_ACTIVE_FLOOR === i">
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
    ...mapGetters('firstElevator', ['GET_ACTIVE_FLOOR']),
    ...mapGetters(['GET_FLOORS'])
  }
}
</script>

<style scoped lang="scss">
.elevatorShaft {
  display: flex;
  flex-direction: column-reverse;

  .floor {
    display: flex;
    gap: 20px;
  }
}
</style>
