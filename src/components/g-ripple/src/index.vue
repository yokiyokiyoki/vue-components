<style lang="less" scoped>
.ripple {
  &-box {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="ripple-box" ref='box' @click="handleClick($event)">
    <!-- 预留一个插槽 -->
    <slot></slot>
  </div>
</template>
<script>
import dom from "@/utils/dom";
export default {
  name: "g-ripple",
  methods: {
    handleClick(e) {
      //获取容器的宽度
      let offsetWidth = this.$refs["box"].offsetWidth;
      let offsetHeight = this.$refs["box"].offsetHeight;
      let radius =
        Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight) * 2;

      //获取容器的坐标
      let offsetTop = dom.getOffsetTop(this.$refs["box"]);
      let offsetLeft = dom.getOffsetLeft(this.$refs["box"]);
      console.log(offsetTop, offsetLeft);
    }
  }
};
</script>
