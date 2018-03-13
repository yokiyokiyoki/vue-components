<style lang="less" scoped>
@height: 300px;
@width: 300px;
.box {
  height: @height;
  width: @width;
}
</style>
<template>
  <div>
      <button @click='$router.push("/")'>back</button>
      <div class="box">
        <g-chart :options="opt" :data-complete="dataComplete"></g-chart>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      opt: null,
      dataComplete: false
    };
  },
  created() {
    this.opt = handleOpt();

    this.dataComplete = true;
  }
};
function handleOpt() {
  return {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }
    ]
  };
}
</script>
