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
      <div>
        <g-ripple v-title='title'>
          <a class="test" ref='test' >水波涟漪</a>
        </g-ripple> 
      </div>
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
  mounted() {}
};
</script>
