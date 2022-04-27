<template>
  <div>
    <!-- <button v-show="$store.state.user.buttons.indexOf('按钮名')!=-1"><router-link class="to" to="canvas">canvas</router-link></button>
    <button><router-link class="to" to="svg">svg</router-link></button>
    <button><router-link class="to" to="echarttest">echarttest</router-link></button>
     -->
    
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import canvas from "./canvas";
export default {
  name: "exercise",
  components: { canvas },
};
</script>

<style scoped>
.to {
  display: inline-block;
  border: 1px solid;
  line-height: 40px;
  width: 100px;
  margin: 10px;
  text-align: center;
}
.main {
  border: 1px solid purple;
  margin:10px;
  padding: 2em 1em;
  min-height: 500px;
}
</style>