import React from 'react';

import DayNames from './calDayNames.jsx';
import TitleBar from './calTitleBar.jsx';
import DayTable from './dayTable.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.currentDay = new Date();
    this.state = {
      year: this.currentDay.getFullYear(),
      month: this.currentDay.getMonth(),
      day: this.currentDay.getDay(),
      current: true
    }
    this.changeMonth = this.changeMonth.bind(this);
  }

  getFirstDay(month, year) {
    // returns the day (0-6) of the first day in a given month
    return new Date(year, month).getDay();
  }

  getDaysInMonth(month, year) {
    // returns the numbers of days in a given month
    return new Date(year, month+1, 0).getDate();
  }

  changeMonth(direction) {
    // change the calendar
    if (direction === 'forward') {
      var newMonth = this.state.month + 1 > 11 ? 0 : this.state.month + 1;
      var newYear = newMonth === 0 ? this.state.year + 1 : this.state.year;
    } else {
      var newMonth = this.state.month - 1 < 0 ? 11 : this.state.month - 1;
      var newYear = newMonth === 11 ? this.state.year - 1 : this.state.year;
    }

    var newCurrent = false;
    if ((this.currentDay.getFullYear() === newYear) && (this.currentDay.getMonth() === newMonth)) {
      newCurrent = true;
    }

    this.setState({
      month: newMonth,
      year: newYear,
      current: newCurrent
    })
  }

  render() {
    return(
      <div className="calendar-container">
        <TitleBar
          month={this.state.month}
          year={this.state.year}
          changeMonth={this.changeMonth}
          changeBack={this.changeMonthBack}
        />
        <DayNames />
        <DayTable
          month={this.state.month}
          year={this.state.year}
          current={this.state.current}
          start={this.getFirstDay(this.state.month, this.state.year)}
          total={this.getDaysInMonth(this.state.month, this.state.year, 0)}
        />
      </div>
    )
  }
}

export default Calendar;