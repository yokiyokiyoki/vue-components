<style lang="less" src='../../../less/g-date-picker.less'>


</style>

<template>
  <div class="picker-panel">
    <div class="picker-panel-header">
      <span class="picker-panel-header-icon-btn picker-prev-btn-arrow-double" @click="handleClickHeaderIcon('lastYear')">
        << </span>
          <span class="picker-panel-header-icon-btn picker-prev-btn" @click="handleClickHeaderIcon('lastMonth')">
            < </span>
              <span>
                <span class="picker-panel-header-label year" @click='type="year"'>{{showDate.year}}年</span>
                <span class="picker-panel-header-label month" @click='type="month"'>{{showDate.month}}月</span>
              </span>
              <span class="picker-panel-header-icon-btn picker-next-btn-arrow-double" @click="handleClickHeaderIcon('nextYear')">>></span>
              <span class="picker-panel-header-icon-btn picker-next-btn" @click="handleClickHeaderIcon('nextMonth')">></span>
    </div>
    <div class="picker-panel-content">
      <date-table v-show='type=="date"' @handleDayCell='handleDayCell' :cells='cells'></date-table>
    </div>
  </div>
</template>
<script>
import moment from "moment";
const R = require("ramda");
import dateTable from "./base/date-table";
export default {
  name: "g-date-picker",
  data() {
    return {
      cells: [],
      type: "date",
      //选中的日期
      selectedDate: {
        year: 2018,
        month: 1,
        day: 22
      },
      //界面上显示的日期
      showDate: {
        year: 2018,
        month: 1,
        day: 22
      }
    };
  },
  created() {
    this.cells = getDaysArr(this.selectedDate, this.selectedDate);
  },
  mounted() {
    console.log(this.cells);
  },
  methods: {
    handleClickHeaderIcon(flag) {
      R.cond([
        [
          R.equals("lastYear"),
          () => {
            this.showDate.year = this.showDate.year - 1;
          }
        ],
        [
          R.equals("lastMonth"),
          () => {
            this.showDate.month =
              this.showDate.month == 1 ? 12 : this.showDate.month - 1;
            this.showDate.year =
              this.showDate.month == 12
                ? this.showDate.year - 1
                : this.showDate.year;
          }
        ],
        [
          R.equals("nextYear"),
          () => {
            this.showDate.year = this.showDate.year + 1;
          }
        ],
        [
          R.equals("nextMonth"),
          () => {
            this.showDate.month =
              this.showDate.month == 12 ? 1 : this.showDate.month + 1;
            this.showDate.year =
              this.showDate.month == 1
                ? this.showDate.year + 1
                : this.showDate.year;
          }
        ]
      ])(flag);
      this.cells = getDaysArr(
        {
          year: this.showDate.year,
          month: this.showDate.month,
          day: 1
        },
        this.selectedDate
      );
    },
    handleDayCell(cell) {
      let date = {
        year: cell.year,
        month: cell.month,
        day: cell.day
      };
      this.showDate = R.clone(date);
      this.selectedDate = R.clone(date);
      this.cells = getDaysArr(
        { year: cell.year, month: cell.month, day: cell.day },
        this.selectedDate
      );
    }
  },
  components: {
    dateTable
  }
};
/**
 *
 * 获取月份天数,拿到下个月的第0天
 * @param {any} year
 * @param {any} month
 * @returns
 */
function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 *
 * 获取当月的星期几
 * @param {any} year
 * @param {any} month
 * @param {any} day
 * @returns
 */
function getWeekday(year, month, day) {
  return new Date(year, month - 1, day).getDay();
}

/**
 *
 * 返回日期数组
 * @param {any} { year, month, day }
 * @param {any} [selectedDate={}]
 * @returns
 */
function getDaysArr({ year, month, day }, selectedDate = {}) {
  // 选中的日期
  let selected = `${selectedDate.year}/${selectedDate.month}/${
    selectedDate.day
  }`;
  // 今天
  let todayDate = `${new Date().getFullYear()}/${new Date().getMonth() +
    1}/${new Date().getDate()}`;

  let dateArr = [];
  // 获取当月多少天
  let days = getMonthDays(year, month);
  // 获取上月有多少天
  let preDays = getMonthDays(year, month - 1);
  // 获取当月的第一天是周几
  let thisMonthFirstDayInWeek = getWeekday(year, month, 1);
  // 获取当月最后一天是周几
  let thisMonthLastDayInWeek = getWeekday(year, month, days);
  // 上月和下月
  let prevMonth = month == 1 ? 12 : month - 1;
  let nextMonth = month == 12 ? 1 : month + 1;

  // 上月在日历的显示
  for (let i = 0; i < thisMonthFirstDayInWeek; i++) {
    let day = preDays - thisMonthFirstDayInWeek + i + 1;
    let lastMonthYear = prevMonth == 12 ? year - 1 : year;
    let date = `${lastMonthYear}/${prevMonth}/${day}`;
    let isSelected = selected == date;
    // let isToday = date == todayDate ? true : false
    dateArr.push({
      // 日期天数
      day,
      // 周几
      weekday: i,
      // 上个月
      type: "prev-month",
      // 所属年
      year: lastMonthYear,
      // 所属月
      month: prevMonth,
      // 是否是选中的那天
      selected: isSelected
    });
  }
  // 当月在日历的显示
  for (let i = 1; i <= days; i++) {
    let date = `${year}/${month}/${i}`;
    let isSelected = selected == date;
    let isToday = date == todayDate;
    dateArr.push({
      // 日期天数
      day: i,
      // 周几
      weekday: (thisMonthFirstDayInWeek + i - 1) % 7,
      // 是否是选中的那天
      selected: isSelected,
      // 当月
      type: "this-month",
      // 所属年
      year,
      // 所属月
      month,
      isToday
    });
  }
  // 下个月，换到下一行就是14，该行就用7
  for (let i = 1; i < 14 - thisMonthLastDayInWeek; i++) {
    let date = `${nextMonthYear}/${nextMonth}/${i}`;
    let nextMonthYear = nextMonth == 1 ? year + 1 : year;
    let isSelected = selected == date;
    // let isToday = date == todayDate ? true : false
    dateArr.push({
      // 日期天数
      day: i,
      //  周几
      weekday: (thisMonthFirstDayInWeek + days + i - 1) % 7,
      // 下个月
      type: "next-month",
      // 所属年
      year: nextMonthYear,
      // 所属月
      month: nextMonth,
      // 是否是选中的那天
      selected: isSelected
    });
  }
  return dateArr;
}
</script>
