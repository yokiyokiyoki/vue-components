

<template>
  <div class="ripple-box" ref='box' @click="handleClick($event)">
    <!-- 预留一个插槽 -->
    <div class="ripple-covers" ref='covers'></div>
    <slot></slot>
  </div>
</template>
<script>
import dom from "@/utils/dom";
import Vue from "vue";
import cover from "./cover.vue";
//创建构造器
const coverExtend = Vue.extend(cover);
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

      //获取点击的坐标
      let event = e || window.event;
      let clientX = event.pageX;
      let clientY = event.pageY;

      //获取点击相对容器的坐标
      let left = clientX - offsetLeft;
      let top = clientY - offsetTop;

      //手动创建一个未挂载的实例,传入data以覆盖
      let coverInstance = new coverExtend({
        data: {
          left,
          top,
          radius
        }
      }).$mount();
      // 在文档之外渲染并且随后挂载
      this.$refs["covers"].appendChild(coverInstance.$el);
    }
  }
};
</script>
<style lang="less" src='./ripple.less'>

</style>
