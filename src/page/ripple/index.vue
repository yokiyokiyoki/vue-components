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
      <button @click='$router.push("/")' v-clickoutside='test'>back</button>
      <div >
        <g-ripple>
          <a class="test" ref='test'>水波涟漪</a>
        </g-ripple>
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      console.log(11);
    }
  },
  mounted() {}
};
</script>
