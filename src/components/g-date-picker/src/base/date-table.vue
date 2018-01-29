<template>
    <div class="picker-panel-content-cells">
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
      headerDays: ["日", "一", "二", "三", "四", "五", "六"],
      cells: []
    };
  }
};
</script>
