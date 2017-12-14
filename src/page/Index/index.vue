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
      <p>图表组件</p>
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
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        }
      ]
    };
  }
</script>
