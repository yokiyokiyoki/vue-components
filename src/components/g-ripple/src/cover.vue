
<template>
  <span class="ripple-cover" ref='cover' :style="{left:`${left}px`, top: `${top}px`, width: `${radius}px`, height: `${radius}px`}"></span>
</template>
<script>
export default {
  data() {
    return {
      radius: 0,
      top: 0,
      left: 0
    };
  },
  methods: {
    remove() {
      //移除该节点
      this.$refs["cover"].parentNode.removeChild(this.$el);
      //销毁该组件
      this.$destroy();
    }
  },
  mounted() {
    setTimeout(() => {
      this.remove();
    }, 1000);
  }
};
</script>
<style lang="less" src='./ripple.less'>


</style>
