<template>
<elevator-shaft
  :floors = floors
></elevator-shaft>

</template>

<script >
import ElevatorShaft from "@/components/ElevatorShaft.vue";

export default {
  name: 'App',
  components: {ElevatorShaft},
  data() {
    return {
      floors: [ 1, 2, 3, 4, 5]
    }
  }
}
</script>

<style scoped>

</style>
