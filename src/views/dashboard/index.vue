<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <Card></Card>
    <Sale></Sale> 
    <Bott></Bott>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Cards'
import Sale from './Sale'
import Bott from './bott'
export default {
  name: 'Dashboard',
  components:{Card,Sale,Bott},
  mounted() {
    this.$store.dispatch('home/getData')
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
