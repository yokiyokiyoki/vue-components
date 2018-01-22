<style lang="less" scoped>
.test {
  display: block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 200px;
  background-color: hsl(207, 73%, 45%);
  color: #fff;
  cursor: pointer;
}

</style>

<template>
  <div>
      <button @click='$router.push("/")' v-clickoutside='clickoutside'>back</button>
      <div >
        <g-ripple >
          <a class="test" ref='test' v-title='title'>水波涟漪</a>
        </g-ripple> 
      </div>
      <span v-title='title' style="margin:100px;">显示title</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "水波涟漪组件"
    };
  },
  methods: {
    clickoutside() {
      console.log("clickoutside");
    }
  },
  mounted() {
    // this.title = "11";
  }
};
</script>
