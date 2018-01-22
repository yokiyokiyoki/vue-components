<template>
  <div></div>
</template>
<script>
export default {
  name: "g-date-picker",
  mounted() {
    console.log(getMonthDays(2018, 11));
  }
};

//获取月份天数
function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate();
}
</script>
