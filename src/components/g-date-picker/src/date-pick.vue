<template>
  <div></div>
</template>
<script>
export default {
  name: "g-date-picker",
  mounted() {}
};

//获取月份天数,拿到下个月的第0天
function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate();
}

//获取当月的星期几
function getWeekday(year, month, day) {
  return new Date(year, month - 1, day).getDay();
}

function getMonthDaysArr(year, month, day) {
  let dateArr = [];
  // 获取当月多少天
  let days = getMonthDays(year, month);
  //获取上月有多少天
  let preDays = getMonthDays(year, month - 1);
  //获取当月的第一天是周几
  let thisMonthFirstDayInWeek = getWeekday(year, month, 1);
  //获取当月最后一天是周几
  let thisMonthLastDayInWeek = getWeekday(year, month, days);

  //上月
  for (let i = 0; i < thisMonthFirstDayInWeek; i++) {
    dateArr.push({
      //日期天数
      dayNum: preDays - thisMonthFirstDayInWeek + i + 1,
      //周几
      weekday: i
    });
  }
  //当月
  for (let i = 1; i < days; i++) {
    dateArr.push({
      //日期天数
      dayNum: i,
      //周几
      weekday: (this.thisMonthFirstDayInWeek + i - 1) % 7,
      //是否是选中的那天
      selected: i === +day,
      //是否是当月
      isThisMonth: true
    });
  }
  //下个月
  for (let i = 1; i < 6 - thisMonthLastDayInWeek; i++) {
    dateArr.push({
      //日期天数
      dayNum: i,
      //  周几
      weekday: (thisMonthFirstDayInWeek + days + i - 1) % 7
    });
  }
  return dateArr;
}
</script>
