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
      day: this.currentDay.getDay()
    }
    this.changeMonth = this.changeMonth.bind(this);
  }

  getFirstDay(month, year) {
    return new Date(month, year).getDay();
  }

  getDaysInMonth(month, year) {
    return new Date(month+1, year, 0).getDate();
  }

  changeMonth() {
    var newMonth = this.state.month + 1 > 11 ? 0 : this.state.month + 1;
    if (newMonth === 1) {
      this.setState({
        month: newMonth,
        year: this.state.year + 1
      })
    } else {
      this.setState({
        month: newMonth
      })
    }
  }

  render() {
    var f = this.getFirstDay(2020,11)
    return(
      <div className="calendar-container">
        <TitleBar month={this.state.month} year={this.state.year} change={this.changeMonth}/>
        <DayNames />
        <DayTable
        start={this.getFirstDay(this.state.month, this.state.year)}
        total={this.getDaysInMonth(this.state.month, this.state.year, 0)}/>
      </div>
    )
  }
}

export default Calendar;