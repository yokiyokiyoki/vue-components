<style lang="less" scoped>
.chart-box {
  height: 100%;
  width: 100%;
}
</style>

<template>
    <div class="chart-box" ></div>
</template>
<script>
import ec from "echarts";
import "echarts-wordcloud";
const R = require("ramda");
// enumerating ECharts events 枚举echarts事件
const ACTION_EVENTS = [
  "legendselectchanged",
  "legendselected",
  "legendunselected",
  "datazoom",
  "datarangeselected",
  "timelinechanged",
  "timelineplaychanged",
  "restore",
  "dataviewchanged",
  "magictypechanged",
  "geoselectchanged",
  "geoselected",
  "geounselected",
  "pieselectchanged",
  "pieselected",
  "pieunselected",
  "mapselectchanged",
  "mapselected",
  "mapunselected",
  "axisareaselected",
  "brush",
  "brushselected"
];

const MOUSE_EVENTS = [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousedown",
  "mouseup",
  "globalout"
];
export default {
  name: "g-chart",
  data() {
    return {
      instance: null, //echart实例
      isEmptyData: false //是否是空数据
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    // options(val, oldVal) {
    //   console.log(val);
    //   this.$nextTick(() => {
    //     this.initOption();
    //   });
    // }
    options: {
      handler: function(val, oldVal) {
        console.log(val);
        this.$nextTick(() => {
          this.initOption();
        });
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        window.addEventListener("resize", this._resizeEventHandler, false);
        this.initOption();
      });
    },
    initOption() {
      if (this.dataComplete) {
        if (!R.isEmpty(this.options)) {
          if (this.options.series && this.options.series.length != 0) {
            !this.instance && (this.instance = ec.init(this.$el, "default"));
            this.instance.setOption(this.options, true);
            // expose ECharts events as custom events（遍历echart事件emit）
            ACTION_EVENTS.forEach(event => {
              this.instance.on(event, params => {
                this.$emit(event, params);
              });
            });
            MOUSE_EVENTS.forEach(event => {
              this.instance.on(event, params => {
                this.$emit(event, params);
              });
            });
          } else {
            //series没有的时候则销毁该实例
            this.instance.dispose();
            this.instance = null;
            this.isEmptyData = true;
          }
        } else {
          this.isEmptyData = true;
        }
      }
    },
    resizeEventHandler() {
      if (this.instance) {
        throttle(this.instance.resize(), 300);
      }
    }
  },
  props: {
    dataComplete: {
      type: Boolean,
      default() {
        return false;
      },
      required: true
    },
    options: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  },
  beforeDestroy() {
    window.addEventListener("resize", this._resizeEventHandler, false);
  }
};

// 节流函数
function throttle(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
</script>
