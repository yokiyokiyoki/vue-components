<style lang="less" scoped>
.picker-panel {
  font-size: 12px;
  &-header {
  }
  &-content {
    &-cells {
      width: 196px;
      height: 196px;
      .cells {
        &-header {
          span {
            width: 24px;
            height: 24px;
            display: inline-block;
            margin: 2px;
            color: #bbbec4;
          }
        }
        &-content {
          .cell {
            width: 28px;
            height: 28px;
            display: inline-block;
            cursor: pointer;
            user-select: none;
            border-radius: 3px;
            //增加动画
            transition: all 0.2s ease-in-out;
            &-selected {
              background: #2d8cf0;
              color: #fff;
            }
            em {
              width: 24px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              margin: 2px;
              font-style: normal;
              border-radius: 3px;
              display: inline-block;
            }
            &-prev-month,
            &-next-month {
              color: #bbbec4;
            }
          }
        }
      }
    }
  }
}

</style>

<template>
  <div class="picker-panel">
    <div class="picker-panel-header"></div>
    <div class="picker-panel-content">
      <div class="picker-panel-content-cells">
        <div class="cells-header">
          <span v-for='day in headerDays' :key='day'>{{day}}</span>
        </div>
        <div class="cells-content">
          <span :class="getCellCls(cell)" v-for='(cell,index) in cells' :key='index' @click='handleCell(cell)'>
            <em>{{cell.dayNum}}</em>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "g-date-picker",
  data() {
    return {
      headerDays: ["日", "一", "二", "三", "四", "五", "六"],
      cells: []
    };
  },
  created() {
    this.cells = getMonthDaysArr(2018, 1, 22);
  },
  mounted() {
    console.log(this.cells);
  },
  methods: {
    getCellCls(cell) {
      return [
        "cell",
        {
          [`cell-selected`]: cell.selected,
          [`cell-disabled`]: cell.disabled,
          [`cell-today`]: cell.type === "today",
          [`cell-prev-month`]: cell.type === "prev-month",
          [`cell-next-month`]: cell.type === "next-month"
        }
      ];
    },
    handleCell(cell) {
      this.cells = getMonthDaysArr(cell.year, cell.month, cell.dayNum);
    }
  }
};

// 关于星期
// 0是代表周日

//获取月份天数,拿到下个月的第0天
function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate();
}

//获取当月的星期几
function getWeekday(year, month, day) {
  return new Date(year, month - 1, day).getDay();
}

function getMonthDaysArr(year, month, day = 1) {
  // console.log(moment(`${year}/${month}/${day}`));
  let dateArr = [];
  // 获取当月多少天
  let days = getMonthDays(year, month);
  //获取上月有多少天
  let preDays = getMonthDays(year, month - 1);
  //获取当月的第一天是周几
  let thisMonthFirstDayInWeek = getWeekday(year, month, 1);
  //获取当月最后一天是周几
  let thisMonthLastDayInWeek = getWeekday(year, month, days);
  //上月和下月
  let prevMonth = month == 1 ? 12 : month - 1;
  let nextMonth = month == 12 ? 1 : month + 1;

  //上月在日历的显示
  for (let i = 0; i < thisMonthFirstDayInWeek; i++) {
    let dayNum = preDays - thisMonthFirstDayInWeek + i + 1;
    year = month == 1 ? year - 1 : year;
    dateArr.push({
      //日期天数
      dayNum,
      //周几
      weekday: i,
      //上个月
      type: "prev-month",
      //所属年
      year,
      //所属月
      month: prevMonth
    });
  }
  //当月在日历的显示
  for (let i = 1; i <= days; i++) {
    dateArr.push({
      //日期天数
      dayNum: i,
      //周几
      weekday: (thisMonthFirstDayInWeek + i - 1) % 7,
      //是否是选中的那天
      selected: i === +day,
      //当月
      type: "this-month",
      //所属年
      year,
      //所属月
      month
    });
  }
  //下个月，换到下一行就是14，该行就用7
  for (let i = 1; i < 14 - thisMonthLastDayInWeek; i++) {
    year = month == 12 ? year + 1 : year;
    dateArr.push({
      //日期天数
      dayNum: i,
      //  周几
      weekday: (thisMonthFirstDayInWeek + days + i - 1) % 7,
      //下个月
      type: "next-month",
      //所属年
      year,
      //所属月
      month: nextMonth
    });
  }
  return dateArr;
}
</script>
