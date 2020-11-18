import React from 'react';

import DayNames from './calDayNames.jsx';
import TitleBar from './calTitleBar.jsx';
import DayTable from './dayTable.jsx';
import axios from 'axios';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.currentDay = new Date();
    this.state = {
      year: this.currentDay.getFullYear(),
      month: this.currentDay.getMonth(),
      day: this.currentDay.getDay(),
      current: true,
      gotFromDb: false,
      reservedDates: [],
    }

    this.closest = this.props.clicked.closest;


    this.changeMonth = this.changeMonth.bind(this);
    this.getReservedDates = this.getReservedDates.bind(this);
    this.formatResponse = this.formatResponse.bind(this);
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



  ////// DAYTABLE STUFF------------------------------///////////////////

  getReservedDates(month, year, callback) {
    // upon recieving data from database, update state to reflect that we have
    // recieved the data for this month and stores the response in the state

    axios.get(`/reservations/${month}/${year}`)
      .then(response => {
        console.log('success');
        callback(response.data);
      })
      .catch(err => console.log('error getting', err));
  }

  formatResponse(responses) {
    var reserved = [];
    for (let obj of responses) {
      reserved.push(obj.day);
    }

    this.setState({
      gotFromDb: true,
      reservedDates: reserved
    });
  }


  getDaysInMonth (month, year) {
    // returns the numbers of days in a given month
    return new Date(year, month+1, 0).getDate();
  }

  difference(date1, date2) {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  }


  /////////// -------------------------------------///////////////////

  getClosestReserved () {
    console.log('props',this.props.clicked);
    var newClosest = this.closest;
    if (!newClosest) {
      console.log('no closest');

      if (this.state.month === this.props.clicked.checkIn.getMonth() && this.state.year === this.props.clicked.checkIn.getFullYear()) {
        console.log('this month');
        // if in same month as check in day
        for (let day of this.state.reservedDates.slice().sort((a, b) => {return a - b;})) {

          if (day > this.props.clicked.checkIn.getDate()) {
            newClosest = new Date(this.state.year, this.state.month, day);
            this.props.change.closest(newClosest);
            console.log('found', newClosest);
            break;
          }
        }
      }

      else {
        console.log('no closest, different month');
        if (this.difference(this.props.clicked.checkIn, new Date(this.state.year, this.state.month, 5)) > 0) {
          if (this.state.reservedDates.length !== 0) {
            newClosest = new Date(this.state.year, this.state.month, this.state.reservedDates.slice().sort((a, b) => {return a - b;})[0])
            this.props.change.closest(newClosest);
          }
        }
      }
    }

    return newClosest;

  }


  componentDidUpdate() {
    this.closest = this.props.clicked.closest;
  }




  render() {
    if (this.state.gotFromDb){
      this.state.gotFromDb = false;
      return(
        <div className="calendar-container">
          <TitleBar
            month={this.state.month}
            year={this.state.year}
            changeMonth={this.changeMonth}
          />
          <DayNames />
          <DayTable
            month={this.state.month}
            year={this.state.year}
            current={this.state.current}
            view={this.props.view}
            change={this.props.change}
            clicked={this.props.clicked}
            closest={this.getClosestReserved()}
            reservedDates={this.state.reservedDates}
          />
        </div>
      )
    } else {
      this.getReservedDates(this.state.month, this.state.year, this.formatResponse);
      return (
      <div className="calendar-container">
         <TitleBar
            month={this.state.month}
            year={this.state.year}
            changeMonth={this.changeMonth}
          />
          <DayNames />
          <table>
            <tbody>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              </tbody>
          </table>
      </div>);
    }
  }
}

export default Calendar;