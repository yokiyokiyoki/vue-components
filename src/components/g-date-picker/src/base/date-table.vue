<template>
    <div class="picker-panel-content-date-cells">
        <div class="cells-header">
            <span v-for='day in headerDays' :key='day'>{{day}}</span>
        </div>
        <div class="cells-content">
            <span :class="getCellCls(cell)" v-for='(cell,index) in cells' :key='index' @click='handleCell(cell)'>
                <em>{{cell.day}}</em>
            </span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      headerDays: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  props: {
    cells: Array
  },
  methods: {
    getCellCls(cell) {
      return [
        "cell",
        {
          [`cell-selected`]: cell.selected,
          [`cell-disabled`]: cell.disabled,
          [`cell-prev-month`]: cell.type === "prev-month",
          [`cell-next-month`]: cell.type === "next-month",
          [`cell-this-month`]: cell.type === "this-month",
          [`cell-today`]: cell.isToday
        }
      ];
    },
    handleCell(cell) {
      this.$emit("handleDayCell", cell);
    }
  }
};
</script>
