<template>
  <div class="home-view">
    <operaciones-layout></operaciones-layout>
  </div>
</template>

<script>
import OperacionesLayout from '../layouts/OperacionesLayout.vue'

export default {
  name: 'HomeView',
  components: {
    OperacionesLayout,
  },
}
</script>

<style lang="scss" scoped></style>
