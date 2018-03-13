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
      <button @click='add'>添加series</button>
      <button @click='remove'>删除series</button>
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
    console.log(this.opt);
  },
  methods: {
    add() {
      this.opt.series.push({
        data: [
          Math.round(Math.random() * 1000),
          Math.round(Math.random() * 1000),
          Math.round(Math.random() * 1000),
          Math.round(Math.random() * 1000),
          Math.round(Math.random() * 1000),
          Math.round(Math.random() * 1000),
          Math.round(Math.random() * 1000)
        ],
        type: "line"
      });
    },
    remove() {
      this.opt.series.pop();
    }
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
