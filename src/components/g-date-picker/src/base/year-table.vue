<template>
  <div class="picker-panel-content-year-cells">
        <div class="cells-content">
            <span :class="getCellCls(cell)" v-for='(cell,index) in cells' :key='index' @click='handleCell(cell)'>
                <em>{{cell.year}}</em>
            </span>
        </div>
  </div>
</template>
<script>
export default {
  props: {
    cells: Array
  },
  methods: {
    getCellCls(cell) {
      return [
        "cell",
        {
          [`cell-selected`]: cell.selected,
          [`cell-disabled`]: cell.disabled
        }
      ];
    },
    handleCell(cell) {
      this.$emit("handleYearCell", cell);
    }
  }
};
</script>
