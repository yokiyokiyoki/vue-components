<style lang="less" scoped>
  @hoverColor: #2d8cf0;
  @normalColor: #bbbec4;
  @borderColor: #e9eaec;
  @selectedBgColor: #2d8cf0;
  @selectedFontColor: #fff;
  @cellWidth: 24px;
  @cellHeight: 24px;
  .picker-panel {
    font-size: 12px;
    width: 216px;
    border: 1px solid @normalColor;
    &-header {
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-bottom: 1px solid @borderColor;
      transition: color 0.2s ease-in-out;
      span {
        cursor: pointer;
      }
      &-label {
        &.year {
          &:hover {
            color: @hoverColor;
          }
        }
        &.month {
          &:hover {
            color: @hoverColor;
          }
        }
      }
      &-icon-btn {
        display: inline-block;
        width: 20px;
        height: 24px;
        line-height: 26px;
        margin-top: 4px;
        text-align: center;
        cursor: pointer;
        color: @normalColor;
        transition: color 0.2s ease-in-out;
        &.picker-prev-btn {
          float: left;
          &:hover {
            color: @hoverColor;
          }
        }
        &.picker-prev-btn-arrow-double {
          float: left;
          margin-left: 10px;
          &:hover {
            color: @hoverColor;
          }
        }
        &.picker-next-btn {
          float: right;
          &:hover {
            color: @hoverColor;
          }
        }
        &.picker-next-btn-arrow-double {
          float: right;
          margin-right: 10px;
          &:hover {
            color: @hoverColor;
          }
        }
      }
    }
    &-content {
      display: inline-block;
      padding: 10px;
      &-cells {
        width: 196px;
        .cells {
          &-header {
            span {
              width: @cellWidth;
              height: @cellHeight;
              display: inline-block;
              margin: 2px;
              color: @normalColor;
            }
          }
          &-content {
            .cell {
              width: @cellWidth+4px;
              height: @cellHeight+4px;
              display: inline-block;
              cursor: pointer;
              user-select: none;
              border-radius: 3px; //增加动画
              transition: all 0.2s ease-in-out;
              &-prev-month,
              &-next-month {
                color: @normalColor;
              }
              &-this-month {
                &:hover {
                  color: @hoverColor;
                }
              }
              &-today {
                em {
                  position: relative;
                  &::after {
                    display: block;
                    content: '';
                    background-color: @selectedBgColor;
                    width: 6px;
                    height: 6px;
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    border-radius: 50%;
                  }
                }
              }
              &-selected {
                background: @selectedBgColor;
                color: @selectedFontColor;
                &:hover {
                  color: @selectedFontColor;
                }
                em {
                  &::after {
                    background-color: @selectedFontColor;
                  }
                }
              }
              em {
                width: @cellWidth;
                height: @cellHeight;
                line-height: @cellHeight;
                text-align: center;
                margin: 2px;
                font-style: normal;
                border-radius: 3px;
                display: inline-block;
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
    <div class="picker-panel-header">
      <span class="picker-panel-header-icon-btn picker-prev-btn-arrow-double" @click="handleClickHeaderIcon('lastYear')">
        << </span>
          <span class="picker-panel-header-icon-btn picker-prev-btn" @click="handleClickHeaderIcon('lastMonth')">
            < </span>
              <span>
                <span class="picker-panel-header-label year">{{showDate.year}}年</span>
                <span class="picker-panel-header-label month">{{showDate.month}}月</span>
              </span>
              <span class="picker-panel-header-icon-btn picker-next-btn-arrow-double" @click="handleClickHeaderIcon('nextYear')">>></span>
              <span class="picker-panel-header-icon-btn picker-next-btn" @click="handleClickHeaderIcon('nextMonth')">></span>
    </div>
    <div class="picker-panel-content">
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
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  const R = require("ramda");
  export default {
    name: "g-date-picker",
    data() {
      return {
        headerDays: ["日", "一", "二", "三", "四", "五", "六"],
        cells: [],
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
      this.cells = getMonthDaysArr.call(this,
        this.selectedDate.year,
        this.selectedDate.month,
        this.selectedDate.day
      );
    },
    mounted() {
      console.log(this.cells);
    },
    methods: {
      handleClickHeaderIcon(flag) {
        R.cond([
          [R.equals("lastYear"), () => {
            this.showDate.year = this.showDate.year - 1;
          }],
          [R.equals("lastMonth"), () => {
            this.showDate.month = this.showDate.month == 1 ? 12 : this.showDate.month - 1;
            this.showDate.year = this.showDate.month == 12 ? this.showDate.year - 1 : this.showDate.year;
          }],
          [R.equals("nextYear"), () => {
            this.showDate.year = this.showDate.year + 1;
          }],
          [R.equals("nextMonth"), () => {
            this.showDate.month = this.showDate.month == 12 ? 1 : this.showDate.month + 1;
            this.showDate.year = this.showDate.month == 1 ? this.showDate.year + 1 : this.showDate.year;
          }]
        ])(flag);
        this.cells = getMonthDaysArr.call(this, this.showDate.year, this.showDate.month, 1);
      },
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
        this.showDate.year = this.selectedDate.year = cell.year;
        this.showDate.month = this.selectedDate.month = cell.month;
        this.showDate.day = this.selectedDate.day = cell.day;
        console.log(this.selectedDate)
        this.cells = getMonthDaysArr.call(this, cell.year, cell.month, cell.day);
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

  function getMonthDaysArr(year, month, day) {
    // console.log(moment(`${year}/${month}/${day}`));
    //选中的日期
    let selectedDate = `${this.selectedDate.year}/${this.selectedDate.month}/${this.selectedDate.day}`
    //今天
    let todayDate = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`

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
      let day = preDays - thisMonthFirstDayInWeek + i + 1;
      let lastMonthYear = prevMonth == 12 ? year - 1 : year;
      let date = `${lastMonthYear}/${prevMonth}/${day}`
      let isSelected = selectedDate == date ? true : false;
      // let isToday = date == todayDate ? true : false
      dateArr.push({
        //日期天数
        day,
        //周几
        weekday: i,
        //上个月
        type: "prev-month",
        //所属年
        year: lastMonthYear,
        //所属月
        month: prevMonth,
        //是否是选中的那天
        selected: isSelected,
      });
    }
    //当月在日历的显示
    for (let i = 1; i <= days; i++) {
      let date = `${year}/${month}/${i}`
      let isSelected = selectedDate == date ? true : false;
      let isToday = date == todayDate ? true : false
      dateArr.push({
        //日期天数
        day: i,
        //周几
        weekday: (thisMonthFirstDayInWeek + i - 1) % 7,
        //是否是选中的那天
        selected: isSelected,
        //当月
        type: "this-month",
        //所属年
        year,
        //所属月
        month,
        isToday
      });
    }
    //下个月，换到下一行就是14，该行就用7
    for (let i = 1; i < 14 - thisMonthLastDayInWeek; i++) {
      let date = `${nextMonthYear}/${nextMonth}/${i}`
      let nextMonthYear = nextMonth == 1 ? year + 1 : year;
      let isSelected = selectedDate == date ? true : false;
      // let isToday = date == todayDate ? true : false
      dateArr.push({
        //日期天数
        day: i,
        //  周几
        weekday: (thisMonthFirstDayInWeek + days + i - 1) % 7,
        //下个月
        type: "next-month",
        //所属年
        year: nextMonthYear,
        //所属月
        month: nextMonth,
        //是否是选中的那天
        selected: isSelected,
      });
    }
    return dateArr;
  }

</script>
