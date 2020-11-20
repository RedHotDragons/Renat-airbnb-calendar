import React from 'react';

import DayNames from '../calendar/calDayNames.jsx';
import TitleBar from './doubleTitleBar.jsx';
import DayTable from './doubleDayTable.jsx';
import axios from 'axios';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.currentDay = new Date();
    this.state = {
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
    this.props.change.month(direction);
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
    var newClosest = this.closest;
    if (!newClosest) {

      if (this.props.date.month === this.props.clicked.checkIn.getMonth() && this.props.date.year === this.props.clicked.checkIn.getFullYear()) {
        // if in same month as check in day
        for (let day of this.state.reservedDates.slice().sort((a, b) => {return a - b;})) {

          if (day > this.props.clicked.checkIn.getDate()) {
            newClosest = new Date(this.props.date.year, this.props.date.month, day);
            this.props.change.closest(newClosest);
            break;
          }
        }
      }

      else {
        if (this.difference(this.props.clicked.checkIn, new Date(this.props.date.year, this.props.date.month, 5)) > 0) {
          if (this.state.reservedDates.length !== 0) {
            newClosest = new Date(this.props.date.year, this.props.date.month, this.state.reservedDates.slice().sort((a, b) => {return a - b;})[0])
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
        <div className="single-calendar-container">
          <TitleBar
            month={this.props.date.month}
            year={this.props.date.year}
            changeMonth={this.changeMonth}
            side={this.props.side}
          />
          <DayNames />
          <DayTable
            month={this.props.date.month}
            year={this.props.date.year}
            current={this.props.date.current}
            view={this.props.view}
            change={this.props.change}
            clicked={this.props.clicked}
            closest={this.getClosestReserved()}
            reservedDates={this.state.reservedDates}
          />
        </div>
      )
    } else {
      this.getReservedDates(this.props.date.month, this.props.date.year, this.formatResponse);
      return (
      <div className="calendar-container">
         <TitleBar
            month={this.props.date.month}
            year={this.props.date.year}
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